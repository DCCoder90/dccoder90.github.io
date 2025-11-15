---
title: "BlinkdotNet"
start: "2018-12"
end: "2019-08"
description: "BlinkdotNet is the unofficial .NET implementation of the Blink Monitor Protocol. BlinkdotNet is available through Nuget and allows for easy interaction with Blink cameras through .NET. Built with .Net Standard 2.1, this library is able to be utilized in many different projects from cross-platform Core applications, to standard framework applications."
headerimage: ""
tags: ['C#', '.Net Standard', 'Nuget', 'API', 'JSON']
github: "https://github.com/DCCoder90/BlinkdotNet"
other: ""
--- 

## Overview

BlinkdotNet is an unofficial .NET library for interacting with the Blink Monitor Protocol. This allows developers to integrate Blink camera networks into .NET applications, providing an asynchronous, C# interface for managing networks and cameras without needing to make raw REST calls.

The library is designed to be consumed as a NuGet package. Users instantiate the `BlinkApiClient` with their Blink account credentials (username and password) to get started. Once instantiated, the client provides `async` methods to perform various actions, such as:

* Fetching networks 
* Getting camera and sync module details
* Capturing thumbnails or video clips
* Retrieving event/video history 
* Checking system health and region info

## Technologies Used

* **.NET Core 2.1**
* **xUnit**: The testing framework used
* **Moq**: Used for creating mock objects for testing, particularly for mocking the REST client.