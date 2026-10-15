include $(TOPDIR)/rules.mk

LUCI_TITLE:=FTTR management interface
LUCI_DEPENDS:=+luci-base +rpcd +ucode +ucode-mod-fs +h3c-fttr-tools
LUCI_DESCRIPTION:=LuCI overview for the FTTR controller and downstream ONUs.
LUCI_MAINTAINER:=LazuliKao

PKG_NAME:=luci-app-fttr
PKG_VERSION:=0.1.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0
PKG_LICENSE_FILES:=LICENSE

define Package/luci-app-fttr/install
	$(INSTALL_DIR) $(1)/www/luci-static/resources/view/fttr
	$(INSTALL_DATA) ./htdocs/luci-static/resources/view/fttr/index.js $(1)/www/luci-static/resources/view/fttr/index.js
	$(INSTALL_DATA) ./htdocs/luci-static/resources/view/fttr/config.js $(1)/www/luci-static/resources/view/fttr/config.js
	$(INSTALL_DATA) ./htdocs/luci-static/resources/view/fttr/hardware.js $(1)/www/luci-static/resources/view/fttr/hardware.js
	$(INSTALL_DATA) ./htdocs/luci-static/resources/view/fttr/sync.js $(1)/www/luci-static/resources/view/fttr/sync.js
	$(INSTALL_DATA) ./htdocs/luci-static/resources/view/fttr/hl202.js $(1)/www/luci-static/resources/view/fttr/hl202.js
	$(INSTALL_DIR) $(1)/usr/share/fttr $(1)/usr/libexec
	$(INSTALL_DATA) ./root/usr/share/fttr/hl202-request.uc $(1)/usr/share/fttr/hl202-request.uc
	$(INSTALL_BIN) ./root/usr/libexec/fttr-hl202 $(1)/usr/libexec/fttr-hl202
	$(INSTALL_DIR) $(1)/usr/share/luci/menu.d
	$(INSTALL_DATA) ./root/usr/share/luci/menu.d/luci-app-fttr.json $(1)/usr/share/luci/menu.d/luci-app-fttr.json
	$(INSTALL_DIR) $(1)/usr/share/rpcd/acl.d
	$(INSTALL_DATA) ./root/usr/share/rpcd/acl.d/luci-app-fttr.json $(1)/usr/share/rpcd/acl.d/luci-app-fttr.json
	$(INSTALL_DIR) $(1)/usr/libexec/rpcd
	$(INSTALL_BIN) ./root/usr/libexec/rpcd/luci.fttr $(1)/usr/libexec/rpcd/luci.fttr
endef

include $(TOPDIR)/feeds/luci/luci.mk
