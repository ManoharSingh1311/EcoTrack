# Service Health Check Script for EcoTrack
# This script verifies all services are running and ready

Write-Host "🔍 EcoTrack Service Health Check" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

$allHealthy = $true

# Function to check service health
function Test-ServiceHealth {
    param(
        [string]$ServiceName,
        [string]$Url,
        [int]$ExpectedStatus = 200
    )
    
    Write-Host "Checking $ServiceName..." -NoNewline
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Method GET -TimeoutSec 5 -UseBasicParsing
        if ($response.StatusCode -eq $ExpectedStatus) {
            Write-Host " ✓ ONLINE" -ForegroundColor Green
            return $true
        } else {
            Write-Host " ✗ UNEXPECTED STATUS: $($response.StatusCode)" -ForegroundColor Yellow
            return $false
        }
    }
    catch {
        Write-Host " ✗ OFFLINE" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
        return $false
    }
}

# Function to check Eureka registered services
function Test-EurekaServices {
    Write-Host "Checking Eureka Service Registry..." -NoNewline
    
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:8761/eureka/apps" -Method GET
        $apps = $response.applications.application
        
        if ($apps) {
            Write-Host " ✓ ONLINE" -ForegroundColor Green
            Write-Host ""
            Write-Host "  Registered Services:" -ForegroundColor Cyan
            
            $expectedServices = @('ITEM-SERVICE', 'USER-SERVICE', 'API-GATEWAY')
            $foundServices = @()
            
            foreach ($app in $apps) {
                $serviceName = $app.name
                $instanceCount = if ($app.instance -is [array]) { $app.instance.Count } else { 1 }
                Write-Host "    - $serviceName ($instanceCount instance(s))" -ForegroundColor White
                $foundServices += $serviceName
            }
            
            Write-Host ""
            
            # Check if all expected services are registered
            $missingServices = $expectedServices | Where-Object { $_ -notin $foundServices }
            if ($missingServices.Count -eq 0) {
                Write-Host "  ✓ All expected services are registered!" -ForegroundColor Green
                return $true
            } else {
                Write-Host "  ⚠ Missing services: $($missingServices -join ', ')" -ForegroundColor Yellow
                return $false
            }
        } else {
            Write-Host " ⚠ NO SERVICES REGISTERED" -ForegroundColor Yellow
            return $false
        }
    }
    catch {
        Write-Host " ✗ CANNOT CONNECT" -ForegroundColor Red
        return $false
    }
}

# Check MySQL
Write-Host "1. Database Server (MySQL)" -ForegroundColor Yellow
Write-Host "   Checking MySQL service..." -NoNewline
$mysqlService = Get-Service -Name "MySQL*" -ErrorAction SilentlyContinue | Select-Object -First 1
if ($mysqlService -and $mysqlService.Status -eq 'Running') {
    Write-Host " ✓ RUNNING" -ForegroundColor Green
} else {
    Write-Host " ✗ NOT RUNNING" -ForegroundColor Red
    Write-Host "   Please start MySQL service: Start-Service MySQL80" -ForegroundColor Gray
    $allHealthy = $false
}
Write-Host ""

# Check Discovery Server (Eureka)
Write-Host "2. Discovery Server (Eureka - Port 8761)" -ForegroundColor Yellow
$eurekaHealthy = Test-ServiceHealth -ServiceName "Eureka" -Url "http://localhost:8761/actuator/health"
if (-not $eurekaHealthy) { $allHealthy = $false }
Write-Host ""

# Check API Gateway
Write-Host "3. API Gateway (Port 8080)" -ForegroundColor Yellow
$gatewayHealthy = Test-ServiceHealth -ServiceName "API Gateway" -Url "http://localhost:8080/actuator/health"
if (-not $gatewayHealthy) { $allHealthy = $false }
Write-Host ""

# Check Eureka Service Registry
Write-Host "4. Service Registry" -ForegroundColor Yellow
$registryHealthy = Test-EurekaServices
if (-not $registryHealthy) { $allHealthy = $false }
Write-Host ""

# Test API endpoints through Gateway
Write-Host "5. API Endpoints (Through Gateway)" -ForegroundColor Yellow

Write-Host "   Testing Items API..." -NoNewline
try {
    $itemsResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/items" -Method GET -TimeoutSec 5
    Write-Host " ✓ ACCESSIBLE" -ForegroundColor Green
}
catch {
    Write-Host " ✗ NOT ACCESSIBLE" -ForegroundColor Red
    $allHealthy = $false
}

Write-Host "   Testing Users API..." -NoNewline
try {
    $usersResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/users" -Method GET -TimeoutSec 5
    Write-Host " ✓ ACCESSIBLE" -ForegroundColor Green
}
catch {
    Write-Host " ✗ NOT ACCESSIBLE" -ForegroundColor Red
    $allHealthy = $false
}
Write-Host ""

# Check Frontend
Write-Host "6. Frontend (React - Port 5173)" -ForegroundColor Yellow
Write-Host "   Checking frontend..." -NoNewline
try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:5173" -Method GET -TimeoutSec 5 -UseBasicParsing
    Write-Host " ✓ RUNNING" -ForegroundColor Green
}
catch {
    Write-Host " ✗ NOT RUNNING" -ForegroundColor Red
    Write-Host "   Start with: cd frontend; npm run dev" -ForegroundColor Gray
    $allHealthy = $false
}
Write-Host ""

# Summary
Write-Host "=================================" -ForegroundColor Cyan
if ($allHealthy) {
    Write-Host "✓ All Systems Operational!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Access the application:" -ForegroundColor Cyan
    Write-Host "   Frontend:  http://localhost:5173" -ForegroundColor White
    Write-Host "   Eureka:    http://localhost:8761" -ForegroundColor White
    Write-Host "   Gateway:   http://localhost:8080" -ForegroundColor White
} else {
    Write-Host "⚠ Some Services Are Not Running!" -ForegroundColor Red
    Write-Host ""
    Write-Host "📖 Next Steps:" -ForegroundColor Yellow
    Write-Host "   1. Start missing services in correct order:" -ForegroundColor White
    Write-Host "      a) Discovery Server" -ForegroundColor Gray
    Write-Host "      b) API Gateway" -ForegroundColor Gray
    Write-Host "      c) Item Service" -ForegroundColor Gray
    Write-Host "      d) User Service" -ForegroundColor Gray
    Write-Host "      e) Frontend" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   2. Wait 30-60 seconds for service registration" -ForegroundColor White
    Write-Host "   3. Run this script again to verify" -ForegroundColor White
    Write-Host ""
    Write-Host "   See TROUBLESHOOTING.md for detailed help" -ForegroundColor Cyan
}
Write-Host ""
