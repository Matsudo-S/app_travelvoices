export interface NavigationItem {
  href: string
  mainText: string
  subText: string
  showInDrawer?: boolean
}

export interface NavigationData {
  items: NavigationItem[]
}
