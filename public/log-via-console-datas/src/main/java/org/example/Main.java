package org.example;

import java.util.Objects;
import java.util.Scanner;
import java.time.LocalDateTime;

public class Main {

    public static String alterarDataHoraAtual() {
        LocalDateTime dataHoraAtual = LocalDateTime.now();
        String dataHoraAtualString = dataHoraAtual.toString();

        String dataAtual = dataHoraAtualString.substring(8, 10) + '/' + dataHoraAtualString.substring(5, 7) + '/' + dataHoraAtualString.substring(0, 4);
        String horaAtual = dataHoraAtualString.substring(11, 19);

        String dataHoraAtualFormatada = "[" + dataAtual + " " + horaAtual + "]";
        return dataHoraAtualFormatada;
    }

    public static void alterarNome(String nomeAntigo, String nomeNovo) {
        System.out.println("\nHorário da alteração: " + Main.alterarDataHoraAtual());

        System.out.println("Nome do perfil alterado de '" + nomeAntigo + "' para '" + nomeNovo + "'.");

    }

    public static void alterarEmail(String emailAntigo, String emailNovo) {
        System.out.println("\nHorário da alteração: " + Main.alterarDataHoraAtual());

        System.out.println("Nome do perfil alterado de '" + emailAntigo + "' para '" + emailNovo + "'.");
    }

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        System.out.println("Bem-vindo(a) as configurações de perfil da TREE TECHNOLOGY!");

        Integer opcao = 0;

        String nomeAtual = "José Silva";
        String emailAtual = "jose.silva@sptech.school";
        String senhaAtual = "teste123"; // Apenas para simulação, caso estiver em ambiente de produção poderá criptografada em SHA256.

        do {
            System.out.println("""
                ======================================
                Escolha uma das opções a seguir: 
                
                1- Alterar nome
                2- Alterar e-mail
                3- Alterar senha
                4- Visualizar data e horário atual
                5- Sair
                """);
            opcao = scanner.nextInt();
            scanner.nextLine();

            if (opcao == 1) {
                System.out.println("Nome atual: " + nomeAtual);
                System.out.println("Digite o novo nome para o perfil: ");
                String nomeNovo = scanner.nextLine();
                alterarNome(nomeAtual, nomeNovo);
                nomeAtual = nomeNovo;
            } else if (opcao == 2) {
                System.out.println("E-mail atual: " + emailAtual);
                System.out.println("Digite o novo nome para o perfil: ");
                String emaiNovo = scanner.nextLine();
                alterarEmail(emailAtual, emaiNovo);
                emailAtual = emaiNovo;
            } else if (opcao == 3) {
                System.out.println("VERIFICAÇÃO DE SENHA! Digite a senha atual: ");
                String verificacaoSenhaAtual = scanner.nextLine();

                if (Objects.equals(verificacaoSenhaAtual, senhaAtual)) {
                    System.out.println("\nSenha atual correta!");
                    System.out.println("Digite a nova senha: ");
                    String senhaNova = scanner.nextLine();
                    senhaAtual = senhaNova;

                    System.out.println("\nSenha alterada com sucesso! Horário da alteração: " + Main.alterarDataHoraAtual());
                } else {
                    System.out.println("\nERRO! Senha inválida! Tente novamente mais tarde.");
                }
            } else if (opcao == 4) {
                System.out.println("Data e hora atual: " + Main.alterarDataHoraAtual());

            } else if (opcao == 5) {
                System.out.println("Até logo! Horário de saída: " + Main.alterarDataHoraAtual() );
            } else {
                System.out.println("Opção inexistente!");
            }

            if (opcao != 5) {
                System.out.println("Pressione Enter para continuar...");
                scanner.nextLine();
            }

        } while (opcao != 5);

        scanner.close();

    }



}