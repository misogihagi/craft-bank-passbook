terraform {
  required_providers {
    auth0 = {
      source = "auth0/auth0"
      version = "1.24.0"
    }
  }
}

provider "auth0" {
  domain        = var.domain
  client_id     = var.client_id
  client_secret = var.client_secret
  debug         = var.debug
}

resource "auth0_client" "terraform_client" {
  name                = "terraform_client"
  app_type            = "spa" #SinglePageApplicationの略
  callbacks           = ["http://localhost:3000"]
  allowed_origins     = ["http://localhost:3000"]
  allowed_logout_urls = ["http://localhost:3000"]
  web_origins         = ["http://localhost:3000"]
  
  jwt_configuration {
    alg                 = "RS256" #HS256にすると後々の操作でエラーになります
    lifetime_in_seconds = 36000
  }
  
  oidc_conformant = true
}

resource "auth0_user" "user" {
  connection_name = "Username-Password-Authentication"
  user_id         = "1"
  name            = "sakata ginga"
  nickname        = "のんべえ銀ちゃん"
  email           = "ginga_sakata@test.com"
  email_verified  = true
  password        = "ginga_ssakata"
  picture         = "https://www.example.com/a-valid-picture-url.jpg"
}
