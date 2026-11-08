# LuCI package source

This directory on `main` contains the package Makefile template and LuCI menu,
ACL, and translation sources. It does not contain the generated JavaScript
assets, so it is not a complete OpenWrt package and cannot be compiled directly.

To build the package, use the generated root-level package from the `package`
branch instead:

```sh
git clone --single-branch --branch package https://github.com/LazuliKao/luci-app-fttr.git package/luci-app-fttr
make package/luci-app-fttr/compile V=s
```

CI publishes the complete package to that branch after validating and building
the frontend on `main`. The `package` branch includes the compiled JavaScript,
Makefile, menu, ACL, and translations.
