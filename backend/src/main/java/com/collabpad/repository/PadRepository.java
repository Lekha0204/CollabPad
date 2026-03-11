package com.collabpad.repository;

import com.collabpad.model.Pad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PadRepository extends JpaRepository<Pad, Long> {
    Optional<Pad> findByPadCode(String padCode);
}
