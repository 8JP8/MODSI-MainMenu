export default {
	async inp_emailonTextChanged() {
		// Verifica se o campo está vazio ou tem menos de 3 caracteres
		if (!inp_email.text || inp_email.text.length < 3) {
			txt_welcome.setText(""); // Limpa a mensagem
			return; // Interrompe a execução
		}

		// Executa a query apenas se o email for válido
		await CheckIfEmailExists.run();

		// Atualiza o texto baseado no resultado (assumindo que `Exists` é a propriedade retornada)
		if (inp_email.isValid) {
			if (CheckIfEmailExists.data?.Exists === true) {
				btn_navigateToSignUp.setColor('blue')
				txt_welcome.setTextColor('green')
				txt_welcome.setText("Email Válido");
			} else {
				btn_navigateToSignUp.setColor('red')
				txt_welcome.setTextColor('red')
				txt_welcome.setText("Email Não Registado");
			}
		}
		else { btn_navigateToSignUp.setColor('blue'); }
	}
}