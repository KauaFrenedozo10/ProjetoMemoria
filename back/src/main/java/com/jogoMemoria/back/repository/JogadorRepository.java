package com.jogoMemoria.back.repository;

import com.jogoMemoria.back.entity.Jogador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JogadorRepository extends JpaRepository<Jogador, String> {
    Optional<Jogador> findByUsernameAndSenha(String username, String senha);
    List<Jogador> findAllByOrderByPontuacaoDesc();
}
