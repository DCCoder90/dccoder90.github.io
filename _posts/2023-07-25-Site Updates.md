---
share: true
title: "Site Updates"
date: "2023-07-25"
categories:
  - "general"
tags:
  - "update"
---

So, I figured I'd spend a little bit of time cleaning up some old posts.  If you go back and look at some of my older posts, around the code you'll see tags such as: `[cc lang="c-sharp"]` or `[/cc]`.  These tags are from the [codecolorer](https://kpumuk.info/projects/wordpress-plugins/codecolorer/#:~:text=Go%20to%20the%20Options%2FCodeColorerpage%20in%20Site%20Adminand%20change,be%20in%20code%20block%2C%20but%20without%20syntax%20highlighting%29.) plugin from when I was on wordpress, before they had the fancy block editor.  This was many years ago.   

A funny side note, if you google `[cc lang="c-sharp` the majority of the results returned are my website, I guess that goes to show how badly it needs to be updated.

So I figured I'd go back and try to update some of my old posts.  Some of the pictures that are gone in those posts are just lost to time, but I'll do my best to try and locate them, mostly I just wanted to improve readability of those old posts for posterity's sake.  I'm also going to be going through and trying to find any dead links and get them fixed back up.

I would also like to add that I am well aware that my code highlighting is kind of broken at the moment on here, I plan on fixing that at some point this week.  First is to decide on a color scheme, though Ethan Schoonover's [Solarized](https://ethanschoonover.com/solarized/) is looking nice.

## Update on dEngine

For those keeping track, I haven't given up on dEngine just yet.  Things have been busy both at work and home so pretty much just waiting for a lull in life so that I can jump back on it.  

In regards to the UI I did come across [imgui](https://github.com/ocornut/imgui) which could assist in building a more robust UI system.   Also! A decent app framework is [Walnut](https://github.com/StudioCherno/Walnut) these were found through [The Cherno's video](https://www.youtube.com/watch?v=-NJDxf4XwlQ) on building beautiful desktop applications.

## Shaders

On another note I played around with Shaders a little the other day, and that was interesting.  Here's a few tutorials, and the code for the shader I made playing around with them:

* [(984) An introduction to Shader Art Coding - YouTube](https://www.youtube.com/watch?v=f4s1h2YETNY)
* [An introduction to Shader Art Coding - YouTube](https://www.youtube.com/watch?v=f4s1h2YETNY)

```glsl
vec3 palette( float t ) {
    vec3 a = vec3(0.218,0.5,1.278);
    vec3 b = vec3(0.588,0.418,0.5);
    vec3 c = vec3(-0.722,0.608,1.0);
    vec3 d = vec3(-1.972,0.333,0.667);

    return a + b*cos( 6.28318*(c*t+d) );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
    
    for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;

        float d = length(uv) * exp(-length(uv0));

        vec3 col = palette(length(uv0) + i*.4 + iTime*.4);

        d = sin(d*8. + iTime)/8.;
        d = abs(d);

        d = pow(0.01 / d, 1.2)-.5;

        finalColor += col * d;
    }
        
    fragColor = vec4(finalColor, 1.0);
}
```

This code can be run over at [ShaderToy](https://www.shadertoy.com/)