import { createElement } from 'react'

const path = (d) => ({ tag: 'path', attrs: { d } })
const circle = (cx, cy, r) => ({ tag: 'circle', attrs: { cx, cy, r } })
const rect = (x, y, width, height, rx = 0) => ({
  tag: 'rect',
  attrs: { x, y, width, height, rx },
})

const ICONS = {
  trend: [path('M3 17l6-6 4 4 8-8'), path('M14 7h7v7')],
  document: [
    path('M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z'),
    path('M14 3v5h5'),
    path('M9 13h6'),
    path('M9 17h6'),
  ],
  search: [circle(11, 11, 7), path('m20 20-3.5-3.5')],
  shield: [
    path('M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z'),
    path('m9 12 2 2 4-4'),
  ],
  bell: [path('M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8'), path('M10 20a2 2 0 0 0 4 0')],
  building: [
    path('M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16'),
    path('M14 9h5a1 1 0 0 1 1 1v11'),
    path('M8 8h2'),
    path('M8 12h2'),
    path('M8 16h2'),
    path('M3 21h18'),
  ],
  people: [
    path('M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'),
    circle(9, 7, 4),
    path('M22 21v-2a4 4 0 0 0-3-3.87'),
    path('M16 3.13a4 4 0 0 1 0 7.75'),
  ],
  eye: [
    path('M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z'),
    circle(12, 12, 3),
  ],
  target: [circle(12, 12, 9), circle(12, 12, 5), circle(12, 12, 1)],
  clock: [circle(12, 12, 9), path('M12 7v5l3 2')],
  lock: [rect(5, 11, 14, 10, 2), path('M8 11V7a4 4 0 0 1 8 0v4')],
  layers: [
    path('M12 3l9 5-9 5-9-5z'),
    path('m3 13 9 5 9-5'),
  ],
  check: [path('m5 12 5 5L20 7')],
  menu: [path('M4 6h16'), path('M4 12h16'), path('M4 18h16')],
  close: [path('M6 6l12 12'), path('M18 6L6 18')],
  arrow: [path('M5 12h14'), path('m13 6 6 6-6 6')],
  mail: [rect(3, 5, 18, 14, 2), path('m3 7 9 6 9-6')],
  pin: [
    path('M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z'),
    circle(12, 10, 2.5),
  ],
  chat: [path('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z')],
}

/** Ícone SVG decorativo (stroke) que herda a cor do texto. */
export default function Icon({ name, size = 24, className }) {
  const shapes = ICONS[name]

  if (!shapes) {
    return null
  }

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shapes.map(({ tag, attrs }, index) =>
        createElement(tag, { key: index, ...attrs }),
      )}
    </svg>
  )
}
