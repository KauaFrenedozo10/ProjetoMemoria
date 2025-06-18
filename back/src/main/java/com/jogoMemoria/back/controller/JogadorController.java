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

    @GetMapping("/scoreboard")
    public ResponseEntity<List<Jogador>> getScoreboard() {
        List<Jogador> jogadores = service.listarTodosOrdenadosPorPontuacao();
        if (jogadores.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(jogadores);
    }

    @PatchMapping("/{username}/pontuacao")
    public ResponseEntity<Jogador> atualizarPontuacao(@PathVariable String username, @RequestBody int novaPontuacao) {
        Optional<Jogador> jogadorAtualizado = service.atualizarPontuacaoSeMaior(username, novaPontuacao);

        if (jogadorAtualizado.isPresent()) {
            return ResponseEntity.ok(jogadorAtualizado.get());
        } else {
            Optional<Jogador> jogadorExistente = service.buscarPorUsername(username);
            if (jogadorExistente.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        }
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deletar(@PathVariable String username) {
        service.deletar(username);
        return ResponseEntity.noContent().build();
    }
}
