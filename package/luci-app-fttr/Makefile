include $(TOPDIR)/rules.mk

LUCI_TITLE:=FTTR management interface
LUCI_DEPENDS:=+luci-base +rpcd +ucode +ucode-mod-fs +h3c-fttr-tools
LUCI_DESCRIPTION:=LuCI overview for the FTTR controller and downstream ONUs.
LUCI_MAINTAINER:=LazuliKao

PKG_NAME:=luci-app-fttr
PKG_VERSION:=0.1.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0

# Windows checkouts may not retain executable bits. Set them in the staged payload.
define Build/Prepare/luci-app-fttr
	chmod 0755 $(PKG_BUILD_DIR)/root/usr/libexec/fttr-hl202
	chmod 0755 $(PKG_BUILD_DIR)/root/usr/libexec/rpcd/luci.fttr
endef

include $(TOPDIR)/feeds/luci/luci.mk
