include $(TOPDIR)/rules.mk

LUCI_TITLE:=FTTR management interface
LUCI_DEPENDS:=+luci-base +rpcd +h3c-fttr-tools
LUCI_DESCRIPTION:=LuCI overview for the FTTR controller and downstream ONUs.
LUCI_MAINTAINER:=LazuliKao

PKG_NAME:=luci-app-fttr
PKG_VERSION:=0.1.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
