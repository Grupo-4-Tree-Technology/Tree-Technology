package com.technology.tree;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        Integer opcao = 0;

        String nomeAtual = "José Silva";
        String emailAtual = "jose.silva@sptech.school";
        String senhaAtual = "123"; // Apenas para simulação no ambiente de desenvolvimento.

        List<Integer> listaOpcoesEscolhidas = new ArrayList<>();
        List<String> listaHorasAtuais = new ArrayList<>();

        System.out.println("Bem-vindo(a) as configurações de perfil da TREE TECHNOLOGY!");

        do {
            System.out.println("""
                ======================================================
                Escolha uma das opções a seguir (Digite "6" para sair): 
                
                1- Alterar nome
                2- Alterar e-mail
                3- Alterar senha
                4- Visualizar data e horário atual
                5- Histórico das últimas atividades
                ======================================================
                """);
            opcao = scanner.nextInt();
            scanner.nextLine();

            listaOpcoesEscolhidas.add(opcao);
            listaHorasAtuais.add(Perfil.coletarDataHoraAtual());

            if (opcao == 1) {
                System.out.println("Nome atual: " + nomeAtual);
                System.out.println("Digite o novo nome para o perfil: ");

                String nomeNovo = scanner.nextLine();
                Perfil.alterarNome(nomeAtual, nomeNovo);
                nomeAtual = nomeNovo;

            } else if (opcao == 2) {
                System.out.println("E-mail atual: " + emailAtual);
                System.out.println("Digite o novo nome para o perfil: ");

                String emaiNovo = scanner.nextLine();
                Perfil.alterarEmail(emailAtual, emaiNovo);
                emailAtual = emaiNovo;

            } else if (opcao == 3) {
                System.out.println("VERIFICAÇÃO DE SENHA! Digite a senha atual: ");
                String verificacaoSenhaAtual = scanner.nextLine();

                if (verificacaoSenhaAtual.equals(senhaAtual)) {
                    System.out.println("\nSenha atual correta!");
                    System.out.println("Digite a nova senha: ");

                    String senhaNova = scanner.nextLine();
                    senhaAtual = senhaNova;

                    System.out.println("\nSenha alterada com sucesso! Horário da alteração: " + Perfil.coletarDataHoraAtual());

                } else {
                    System.out.println("\nERRO! Senha inválida! Tente novamente mais tarde.");
                }
            } else if (opcao == 4) {
                System.out.println("Data e hora atual: " + Perfil.coletarDataHoraAtual());

            } else if (opcao == 5) {
                Perfil.exibirHistorico(listaOpcoesEscolhidas, listaHorasAtuais);

            } else if (opcao == 6) {
                System.out.println("Até logo! Horário de saída: " + Perfil.coletarDataHoraAtual());

            } else {
                System.out.println("Opção inexistente!");

            }

            if (opcao != 6) {
                System.out.println("Pressione Enter para continuar...");
                scanner.nextLine();
            }

        } while (opcao != 6 );

        scanner.close();

    }
}
