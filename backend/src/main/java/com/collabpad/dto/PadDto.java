package com.collabpad.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PadDto {
    private String padCode;
    private String encryptedText;
    private String encryptedCode;
    private String language;
}
