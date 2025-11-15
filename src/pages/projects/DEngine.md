---
title: "DEngine"
start: "2025-07"
end: "Current"
description: "dEngine is a simple 2D game engine written in C++ and making use of the SDL library. This is really just kind of a hobby and nothing amazing is expected to come out of this aside from maybe a simple game or two I write just because."
headerimage: ""
tags: ['C++', 'SDL', 'zLib']
github: "https://github.com/DCCoder90/dengine"
other: ""
--- 


## Overview

dEngine is a simple 2D game engine written in C++. This project was primarily a hobby effort to learn C++ and game development concepts.

The engine uses the SDL library for graphics, audio, and windowing. Its architecture is state-based, allowing different game states (like a title screen or a game level) to be pushed onto and popped from a main game loop. The core `dengine` provides systems for:
* **Game Objects and Components:** A base `GameObject` class that functionality is added to via `Component` classes, such as `SpriteSheet` for animations.
* **UI System:** A UI manager that renders `UIWindow` objects, which in turn are collections of `UIComponent` elements like `Text` and `ProgressBarH`.
* **Event Management:** An `EventSystem` that allows game objects to register callbacks for user input, such as mouse motion and button clicks.
* **Audio:** An `AudioManager` for loading and playing sounds.
* **Logging:** A third-party library, NanoLog, is integrated for logging engine events.

In addition to the engine itself, the project also includes:
* **packer-util:** A command-line utility for packing game assets (like images and audio) into a single compressed `.dat` file using zlib.
* **examples/Game:** A simple game demonstrating the engine's features, including a title screen and a basic level with a player and enemies.
* **Documentation:** The project is configured to use Doxygen to generate documentation, with a GitHub Actions workflow to automatically build and deploy the docs to GitHub Pages.

## Technologies Used

* **Core Language:** C++17
* **Libraries:**
    * **SDL2:** Used for windowing, graphics, and audio.
    * **SDL2_image:** Used for loading image formats (e.g., `.png`).
    * **SDL2_ttf:** Used for rendering TrueType Fonts.
    * **zlib:** Used by the `packer` utility for asset compression.
* **Build & Dependencies:** CMake is used as the build system, and `vcpkg` is used for managing dependencies.
* **Logging:** NanoLog
* **Documentation & CI/CD:** Doxygen and GitHub Actions