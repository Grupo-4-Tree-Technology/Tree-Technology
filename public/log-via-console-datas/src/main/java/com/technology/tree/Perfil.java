package com.technology.tree;

import java.time.LocalDateTime;
import java.util.List;

public class Perfil {
    public static String coletarDataHoraAtual() {
        /*
        * Utilizei o LocalDateTime.now() para pegar a data + hora atual.
        * Utilizei o System.currentTimeMillis() para pegar os milissegundos atuais e concatenar com o horário.
        * */

        LocalDateTime dataHoraAtual = LocalDateTime.now();
        String dataHoraAtualString = dataHoraAtual.toString();

        Long milissegundosAtuais = System.currentTimeMillis();
        String milisegundosString = milissegundosAtuais.toString();

        String dataAtual = dataHoraAtualString.substring(8, 10) + '/' + dataHoraAtualString.substring(5, 7) + '/' + dataHoraAtualString.substring(0, 4);
        String horaAtual = String.format("%s" + ":" + "%s", dataHoraAtualString.substring(11, 19), milisegundosString.substring(0, 3));

        String dataHoraAtualFormatada = "[" + dataAtual + " " + horaAtual + "]";
        return dataHoraAtualFormatada;
    }

    public static void alterarNome(String nomeAntigo, String nomeNovo) {
        System.out.println("\nHorário da alteração: " + Perfil.coletarDataHoraAtual());

        System.out.println("Nome do perfil alterado de '" + nomeAntigo + "' para '" + nomeNovo + "'.");

    }

    public static void alterarEmail(String emailAntigo, String emailNovo) {
        System.out.println("\nHorário da alteração: " + Perfil.coletarDataHoraAtual());

        System.out.println("Nome do perfil alterado de '" + emailAntigo + "' para '" + emailNovo + "'.");
    }

    public static void exibirHistorico(List<Integer> listaOpcoesEscolhidas, List<String> listaHorasAtuais) {
        for (int i = 0; i < listaOpcoesEscolhidas.size(); i++) {

            String descricaoOpcaoSelecionada = "";
            Integer opcaoSelecionada = listaOpcoesEscolhidas.get(i);

            switch (opcaoSelecionada) {
                case 1:
                    descricaoOpcaoSelecionada = "Alteração de nome";
                    break;
                case 2:
                    descricaoOpcaoSelecionada = "Alteração de e-mail";
                    break;
                case 3:
                    descricaoOpcaoSelecionada = "Alteração de senha";
                    break;
                case 4:
                    descricaoOpcaoSelecionada = "Visualização de data e horário atual";
                    break;
                case 5:
                    descricaoOpcaoSelecionada =  "Visualização do histórico das atividades";
                    break;
            }

            System.out.println(String.format("%s | %s", listaHorasAtuais.get(i), descricaoOpcaoSelecionada));
        }
        }
    }
