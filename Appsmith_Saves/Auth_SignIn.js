export default {
	// Login function that handles user authentication
	SignIn: async () => {
		try {
			await Auth_PasswordCheck.getSaltAndHash(inp_password.text, false);
      const loginResponse = await Login_GetAuthToken.run();

      if (loginResponse && loginResponse.Token) {
        // Success - store token and return
        storeValue('authToken', loginResponse.Token);
				showAlert("Autenticado com Sucesso", "success");
      } else {
        // Handle login failure
        showAlert("Login failed: Invalid credentials", "error");
        return null;
      }
    } catch (error) {
			if (Login_GetAuthToken.responseMeta.statusCode.match("401 UNAUTHORIZED")) {
				showAlert("Erro: Password Incorreta", "warning");
			} else {
				console.error("Login error:", error.message || "Unknown error");
				showAlert("Login error: " + (error.message || "Unknown error"), "error");
			}
    }
  }
}