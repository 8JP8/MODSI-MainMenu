export default {
  async Register() {
		try {
			await Auth_PasswordCheck.getSaltAndHash(inp_registerPassword.text, true);
			let response = await SignUp_RegisterUser.run();
		
      // Log the response status to help debug
      console.log("Response status:", response.status);
      
      const rawResponse = response.text; // Fetch raw response
      if (response || SignUp_RegisterUser.responseMeta.statusCode == "200 OK") {
        // Log and display success
        showAlert("Registado com sucesso. Espere por aprovação do administrador.", "success");
      } else {
        // Try to parse JSON, with better error handling
        try {
          // Check if response is empty or not valid JSON
          if (!rawResponse || rawResponse.trim() === '') {
            showAlert(`Erro no registo: Resposta vazia do servidor (Status: ${response.status})`, "error");
          } else {
            const errorData = JSON.parse(rawResponse);
            showAlert("Erro no registo: " + JSON.stringify(errorData), "error");
          }
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          showAlert(`Erro no registo: ${rawResponse || response.statusText}`, "error");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      showAlert("Erro no registo. Tente novamente mais tarde.", "error");
    }
  }
};