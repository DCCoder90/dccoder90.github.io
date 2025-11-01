---
share: true
title: "AWS Secret Storage"
date: "2019-01-01"
categories: 
  - "general"
  - "programming"
tags: 
  - "aws"
  - "csharp"
  - "dotnet"
  - "secrets"
  - "security"
coverImage: "bbd85-pexels-photo-706500.jpeg"
---

Working with any form of a secret in development such as usernames, connection strings, passwords, etc is always difficult. Simply finding a convenient and efficient way of storing them without putting them in source control can be a daunting task. While there are many ways of handling this such as [dotNet secrets](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-2.2&tabs=windows), [Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/), and [Hashicorp Vault](https://www.vaultproject.io/). I, however, decided to go with [AWS's secret manager](https://aws.amazon.com/secrets-manager/).

## Vault Comparison

<table class="wp-block-table"><tbody><tr><td><strong>Vault</strong></td><td><strong>Pros</strong></td><td><strong>Cons</strong></td></tr><tr><td><strong>.Net Secrets</strong></td><td>Easy and quick to setup<br>Built in with .NET Core<br></td><td>Not the best for production<br>Only works with .NET</td></tr><tr><td><strong>Azure Key Vault</strong></td><td>Hosted<br>Practically free</td><td>Difficult automated management<br>Rotation takes a bit of setup</td></tr><tr><td><strong>Vault</strong></td><td>Key rotation<br>Very flexible</td><td>Difficult policy management<br><a href="https://github.com/hashicorp/vault/issues/72">Difficult unseal management</a><br>Must be self-hosted</td></tr><tr><td><strong>AWS</strong></td><td>Hosted<br>Works well with other AWS projects<br>Auto rotation</td><td>Still a fairly new service<br>$0.40 per secret</td></tr></tbody></table>

_Keep in mind that this chart is fully personal opinion, I highly encourage everyone to do their research._

Due to AWS being the current host of choice and not wanted to host and administer a solution myself AWS was the winner.  

## Time to investigate

So my path working with AWS took me down the dark road of documentation and google searches. Being that it's still fairly new, being released in April of 2018, there wasn't really much code examples to look at. After spending a while trying to find something in .NET I was right where I started. Guess it's time to dig into their [API documentation](https://docs.aws.amazon.com/kms/index.html).

_One thing I do have to say about Amazon is that they do an amazing job with their documentation._

## Working with Password Manager

One of the first things that we have to do is bring in the correct nuget package. The AWSSDK.SecretsManager nuget contains all the necessary parts to allow us to easily interact with the AWS Secret Manager.

> Package-Install AWSSDK.SecretsManager

Once we have the appropriate nuget installed now it's just a manager of authenticating with the appropriate credentials and interacting with the secret storage.

I will admit that I may be taking the lazy way out, but I'm sure that most individuals reading this care more about the actual code rather than me babbling on. As you can tell by the code below it is actually fairly easy to interface with the AWS Secret Manager.

## Secret Manager Code

The example below is a implementation that you can quickly plug into your project and start working with.

https://gist.github.com/DCCoder90/a13e04a76e005b7798faa3a316b10246

## Usage

What good is an implementation without a good usage example?

https://gist.github.com/DCCoder90/ddc573c44a7481229f826995ff44c34b
