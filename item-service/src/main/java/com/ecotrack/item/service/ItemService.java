package com.ecotrack.item.service;

import com.ecotrack.item.model.Item;
import com.ecotrack.item.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public List<Item> getItemsByOwnerId(Long ownerId) {
        return itemRepository.findByOwnerId(ownerId);
    }

    public List<Item> getAvailableItems() {
        return itemRepository.findByAvailable(true);
    }

    public List<Item> getItemsByCategory(String category) {
        return itemRepository.findByCategory(category);
    }

    public List<Item> searchItemsByName(String name) {
        return itemRepository.findByNameContainingIgnoreCase(name);
    }

    public Item createItem(Item item, MultipartFile imageFile) {
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                item.setImageData(imageFile.getBytes());
                item.setImageType(imageFile.getContentType());
                item.setImageName(imageFile.getOriginalFilename());
            } catch (IOException e) {
                throw new RuntimeException("Failed to process image file", e);
            }
        }
        return itemRepository.save(item);
    }

    public Item updateItem(Long id, Item itemDetails, MultipartFile imageFile) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));

        item.setName(itemDetails.getName());
        item.setDescription(itemDetails.getDescription());
        item.setCategory(itemDetails.getCategory());
        item.setAvailable(itemDetails.getAvailable());

        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                item.setImageData(imageFile.getBytes());
                item.setImageType(imageFile.getContentType());
                item.setImageName(imageFile.getOriginalFilename());
            } catch (IOException e) {
                throw new RuntimeException("Failed to process image file", e);
            }
        }

        return itemRepository.save(item);
    }

    public void deleteItem(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
        itemRepository.delete(item);
    }

    public Item toggleAvailability(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found with id: " + id));
        item.setAvailable(!item.getAvailable());
        return itemRepository.save(item);
    }
}
