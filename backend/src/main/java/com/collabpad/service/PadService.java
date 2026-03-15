package com.collabpad.service;

import com.collabpad.dto.PadDto;
import com.collabpad.dto.UpdatePadRequest;
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

    public PadDto createPad() {
        String code = UUID.randomUUID().toString().substring(0, 6);

        Pad pad = new Pad();
        pad.setPadCode(code);
        pad.setEncryptedText("");
        pad.setEncryptedCode("");
        pad.setLanguage("javascript");

        Pad savedPad = padRepository.save(pad);
        return convertToDto(savedPad);
    }

    public Optional<PadDto> getPad(String code) {
        return padRepository.findByPadCode(code).map(this::convertToDto);
    }

    public PadDto updatePad(String code, UpdatePadRequest request) {
        Pad pad = padRepository.findByPadCode(code)
                .orElseThrow(() -> new RuntimeException("Pad not found"));

        if (request.getEncryptedText() != null) {
            pad.setEncryptedText(request.getEncryptedText());
        }
        if (request.getEncryptedCode() != null) {
            pad.setEncryptedCode(request.getEncryptedCode());
        }
        if (request.getLanguage() != null) {
            pad.setLanguage(request.getLanguage());
        }

        Pad savedPad = padRepository.save(pad);
        return convertToDto(savedPad);
    }

    private PadDto convertToDto(Pad pad) {
        return new PadDto(
            pad.getPadCode(),
            pad.getEncryptedText(),
            pad.getEncryptedCode(),
            pad.getLanguage()
        );
    }
}