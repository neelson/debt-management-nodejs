# Criar enquete

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/debt**
3. ✅ Valida dados obrigatórios 
4. ✅ **Cria** um débito com os dados fornecidos
5. ✅ Retorna **200**, com débito criado

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
3. ✅ Retorna erro **400** se os dados não forem fornecidos pelo cliente
4. ✅ Retorna erro **500** se der erro ao tentar criar o débito