Been a few years so took me a little bit to get it back up and running locally so figured I'd document the requirements here.

## Environment Setup
### Prerequisites
1. Download and install a Ruby+Devkit version from [RubyInstaller Downloads](https://rubyinstaller.org/). 

2. Run the ridk install step on the last stage of the installation wizard.
3. From the options choose MSYS2 and MINGW development tool chain.
4. Install Jekyll and Bundler using gem install jekyll bundler

```gem install jekyll bundler```

### Dependencies

```
gem install rake
gem install tzinfo-data
bundle add webrick
bundle install
```
### Running

```
docker run --rm -it -v `pwd`\assets:/work:rw -w /work apluslms/develop-sass sass /work/sass/highlight.scss /work/css/highlight.css
bundle exec jekyll serve
```



## Troubleshooting
### "Unknown tag"/Liquid error while using Jekyll
Remove bundle config and gems:
```
rm -r .bundle
rm -r vendor
```
Install gems with bundle:
```
bundle install
```

## Publishing

The action in [github actions](./.github/workflows/ci.yml) should handle everything once it's pushed up.