# ideal-umbrella

## Iniciando a API e o BD

Execute o comando a seguir na raiz do projeto.

``` docker-compose up ```

## Rotas

1. Create partner:

        POST localhost:4000/pdvs/register

        Passe os campos do partner no body.

2. Get partner by id:

        GET localhost:4000/pdvs/:id

        Substitua :id pelo id do partner que deseja buscar.

3. Search partner:

        GET localhost:4000/pdvs/near/?lng=LNG&lat=LAT

        Substitua LNG e LAT por longitude e latitude respectivamente.
