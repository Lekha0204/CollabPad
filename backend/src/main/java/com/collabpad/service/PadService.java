package com.collabpad.service;

import com.collabpad.model.Pad;
import com.collabpad.repository.PadRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PadService {

    private final PadRepository padRepository;

    public PadService(PadRepository padRepository) {
        this.padRepository = padRepository;
    }

    public Pad createPad() {
        String code = UUID.randomUUID().toString().substring(0, 6);

        Pad pad = new Pad();
        pad.setPadCode(code);
        pad.setEncryptedContent("");

        return padRepository.save(pad);
    }

    public Optional<Pad> getPad(String code) {
        return padRepository.findByPadCode(code);
    }

    public Pad updatePad(String code, String encryptedContent) {
        Pad pad = padRepository.findByPadCode(code)
                .orElseThrow(() -> new RuntimeException("Pad not found"));

        pad.setEncryptedContent(encryptedContent);
        return padRepository.save(pad);
    }
}