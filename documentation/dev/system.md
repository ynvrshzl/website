# Websys
Developers manual for **"websys"**

This is an overview of how our website works under-the-hood. The reason this sounds so complicated is becuase... it is lol. The name ["Websys"](../websys) basically treats this website as a mini operating system for sharing our articles.

- boot
- network
- main system lifecycle

## System logs
This is a theoretical outline fo what the website is doing in the backend, with all of the loose parts tied together, into one continous symphony of JavaScript wizardry.

```toml
[login]
welcome to "websys"

[boot]
system initializes...
bootloader => "main.js" is loading modules...
boot kernel complete.

[network]
synchronizing network with front-end... 
synchronizing back-end with front-end...
...

[frontend]
"src/" code is synchronizing backend with HTML interface... done

[main]
> main process event has begun. 
> system-log: "main article is rendered and fetched. if no URL hash is provided, the default 'home' article is loaded."
```


## [0] System boot
when the site loads, main.js is like a bootloader... it initializing all of the all core startup modules like... the [database]() as well as [components]()


## [1] Network
Database mount, Network routing, Content manifests

This is the first network operation... the database index json is fetched from the frontend, by using the <bridge.js> layer, and mounted as a global js reference so it can be used in the site (this is just a design choice we can change later!)

[systems] role: backend to frontend integration
once the backend loads, the frontend is ready for access. [developer-note: this takes under ~5s depending on network loads, so the site should be blazing fast now with this crazy database optimization lol.]

[network] role: main system lifecycle
when the frontend requests an article from a url or link, it calls the backend <bridge.js> layer again and loads articles via the window url, rather than the actual link itself.
