package com.jogoMemoria.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Jogador implements Serializable {
    @Id
    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String senha;

    private int pontuacao;
}

