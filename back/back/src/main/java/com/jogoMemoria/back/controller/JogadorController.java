package com.jogoMemoria.back.controller;

import com.jogoMemoria.back.entity.Jogador;
import com.jogoMemoria.back.service.JogadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/jogadores")
@CrossOrigin(origins = "*") // Libera p front externo!

public class JogadorController {
    @Autowired
    private JogadorService service;

    @PostMapping("/cadastro")
    public ResponseEntity<Jogador> cadastrar(@RequestBody Jogador jogador) {
        return ResponseEntity.ok(service.salvar(jogador));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Jogador loginRequest) {
        Optional<Jogador> jogador = service.autenticar(loginRequest.getUsername(), loginRequest.getSenha());
        if (jogador.isPresent()) {
            return ResponseEntity.ok(jogador.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos");
        }
    }

    @GetMapping
    public List<Jogador> listarTodos() {
        return service.listarTodos();
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deletar(@PathVariable String username) {
        service.deletar(username);
        return ResponseEntity.noContent().build();
    }
}
