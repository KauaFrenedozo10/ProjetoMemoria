package com.jogoMemoria.back.service;


import com.jogoMemoria.back.entity.Jogador;
import com.jogoMemoria.back.repository.JogadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JogadorService {
    @Autowired
    private JogadorRepository repository;

    public Jogador salvar(Jogador jogador) {
        return repository.save(jogador);
    }

    public List<Jogador> listarTodos() {
        return repository.findAll();
    }

    public Optional<Jogador> buscarPorUsername(String username) {
        return repository.findById(username);
    }

    public void deletar(String username) {
        repository.deleteById(username);
    }

    public Optional<Jogador> autenticar(String username, String senha) {
        return repository.findByUsernameAndSenha(username, senha);
    }
}
