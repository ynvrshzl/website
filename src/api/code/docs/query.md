# Queries explained

Essentially the concept is this: __Query, Find, Retrieve, Display.__ 

When we query: __"files autobiography"__ we ask the query api try to find the exact file located at this url: _"https://yvrs.ct.ws/[wiki/autobiography/index.md]"_

In this case, the url in the [bracket] is an example of the actual file in the system. The query itself is "autobiography" but it searches the system for the real file



# System integration
The Query API requires an understanding of the websystem architecture in order to properly integrate it's tools.

* most of the complexity in the system emerges from 
* how the website url and the "wiki/" folder, need to 
* be synchronized in order to map URLs to correct files.
* which is the primary relationship of a website and 
* it's local system files.
* 
* @abstract
* becuase of the system, each markdown file 
* must be titled 'index.md' and the search
* query, simply looks for 'index.md' folder location.