package com.collabpad.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.collabpad.model.Pad;
import com.collabpad.service.PadService;

@RestController
@RequestMapping("/api/pads")
public class PadController {

    private final PadService padService;

    public PadController(PadService padService) {
        this.padService = padService;
    }

    @PostMapping
    public Pad createPad() {
        return padService.createPad();
    }

    @GetMapping("/{code}")
    public Pad getPad(@PathVariable String code) {
        return padService.getPad(code)
                .orElseThrow(() -> new RuntimeException("Pad not found"));
    }

    @PutMapping("/{code}")
    public Pad updatePad(
            @PathVariable String code,
            @RequestBody String encryptedContent) {

        return padService.updatePad(code, encryptedContent);
    }

}
