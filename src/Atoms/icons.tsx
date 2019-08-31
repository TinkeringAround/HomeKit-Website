import React, { FC } from 'react'

// Theme
import { theme } from '../theme'

//--------------------------------------------
type IconProps = {
  type: string | null
  active: boolean
  mini?: boolean
  width?: string
  height?: string
}

export const Icon: FC<IconProps> = ({
  type,
  active,
  mini = false,
  width = '80%',
  height = '80%'
}) => {
  const colorMini = active ? theme.global.colors.headingActive : theme.global.colors.headingInactive
  const colorNormal = active ? theme.global.colors.iconActive : theme.global.colors.iconInactive
  const color = mini ? colorMini : colorNormal

  if (type) {
    switch (type) {
      case 'ac':
        return <AC color={color} width={width} height={height} />
      case 'humidity':
        return <Humidity color={color} width={width} height={height} />
      case 'light':
        return <Light color={color} width={width} height={height} />
      case 'sensor':
        return <Sensor color={color} width={width} height={height} />
      case 'temperature':
        return <Temperature color={color} width={width} height={height} />
      case 'window':
        return <Window color={color} width={width} height={height} />
      case 'settings':
        return <Settings color={color} width={width} height={height} />
      case 'reload':
        return <Reload color={color} width={width} height={height} />
      case 'circleEmpty':
        return <CircleEmpty color={color} width={width} height={height} />
      case 'circleFull':
        return <CircleFull color={color} width={width} height={height} />
      case 'signout':
        return <Signout color={color} width={width} height={height} />
      case 'arrowRight':
        return <ArrowRight color={color} width={width} height={height} />
      case 'battery':
        return <Battery color={color} width={width} height={height} />
      default:
        return <Plus color={color} width={width} height={height} />
    }
  }
  return <Plus color={color} width={width} height={height} />
}

//--------------------------------------------
type Props = {
  color: string
  width?: string
  height?: string
}

const AC: FC<Props> = ({ color, width = '80%', height = '80%' }) => (
  <svg viewBox="0 0 39 32" height={height} width={width}>
    <title>Ventilator</title>
    <path
      fill={color}
      d="M19.415 1.28c6.048 0 11.405 3.629 13.658 9.242 1.466 3.648 1.421 7.648-0.128 11.264-1.542 3.616-4.403 6.413-8.051 7.872-1.754 0.704-3.597 1.062-5.472 1.062-6.048 0-11.405-3.629-13.658-9.242-1.466-3.648-1.421-7.648 0.128-11.264 1.542-3.616 4.403-6.413 8.051-7.872 1.76-0.704 3.597-1.062 5.472-1.062zM19.415 0c-2.035 0-4.038 0.39-5.946 1.152-3.962 1.587-7.072 4.627-8.749 8.557s-1.728 8.275-0.141 12.243c2.445 6.106 8.275 10.048 14.848 10.048 2.042 0 4.038-0.39 5.946-1.152 3.962-1.594 7.072-4.627 8.749-8.557s1.728-8.275 0.141-12.243c-2.445-6.106-8.275-10.048-14.848-10.048v0z"
    />
    <path
      fill="transparent"
      stroke={color}
      d="M28.971 16.781c-0.614-0.326-1.325-0.486-2.163-0.486-0.698 0-1.35 0.109-1.875 0.198-0.237 0.038-0.442 0.077-0.602 0.090-0.358 0.038-0.717 0.051-1.062 0.051-0.691 0-1.28-0.070-1.766-0.173 0.090-0.41 0.064-0.845-0.102-1.261-0.032-0.083-0.077-0.166-0.122-0.25l0.557-0.461c0.045-0.038 0.083-0.083 0.109-0.134 0.026-0.045 0.634-1.107 1.114-2.246 0.858-2.003 0.922-4.301 0.166-5.856-0.858-1.76-2.451-2.861-4.154-2.861-0.301 0-0.608 0.038-0.902 0.109-2.080 0.499-2.97 2.336-2.912 3.84 0.058 1.568 1.101 2.816 1.786 3.642 0.154 0.186 0.288 0.346 0.384 0.474 0.685 0.941 1.082 1.798 1.318 2.496-0.045 0.013-0.090 0.026-0.134 0.045-0.454 0.186-0.813 0.506-1.043 0.902l-0.672-0.25c-0.051-0.019-0.122-0.032-0.166-0.032-0.051 0-1.28 0.006-2.502 0.147-2.163 0.256-4.186 1.344-5.152 2.771-1.306 1.92-1.248 4.288 0.134 5.754 0.934 0.986 1.997 1.19 2.72 1.19s1.453-0.205 2.054-0.582c1.331-0.832 1.894-2.355 2.266-3.366 0.083-0.224 0.154-0.422 0.224-0.57 0.48-1.069 1.024-1.843 1.51-2.394 0.384 0.346 0.877 0.538 1.395 0.55l0.122 0.723c0.013 0.058 0.032 0.115 0.058 0.16s0.64 1.107 1.376 2.093c1.299 1.747 3.251 2.957 4.973 3.085 0.147 0.013 0.301 0.019 0.448 0.019v0c2.138 0 3.936-1.21 4.474-3.002 0.614-2.022-0.531-3.712-1.856-4.416zM19.409 17.907c-1.056 0-1.907-0.851-1.907-1.907 0-1.050 0.851-1.907 1.907-1.907 1.050 0 1.907 0.851 1.907 1.907s-0.858 1.907-1.907 1.907z"
    />
  </svg>
)

const Humidity: FC<Props> = ({ color, width = '80%', height = '80%' }) => (
  <svg id="icon-humidity" viewBox="0 0 39 32" width={width} height={height}>
    <title>Luftfeuchtigkeit</title>
    <path
      fill={color}
      d="M19.509 1.327v0 0zM19.415 1.353c1.9 0.673 11.34 9.967 11.34 18.127 0 7.633-6.62 11.187-11.1 11.187h-0.467c-4.473 0-11.1-3.553-11.1-11.193 0-8.153 9.433-17.447 11.327-18.12zM19.415 0c-2.16 0-12.66 10.567-12.66 19.473 0 8.547 7.42 12.527 12.433 12.527h0.467c5.013 0 12.433-3.98 12.433-12.527 0-8.907-10.513-19.473-12.673-19.473v0z"
    />
    <path fill="transparent" stroke={color} d="M10.508 20.36c0 0 0.933 6.18 7.233 7.653" />
  </svg>
)

const Light: FC<Props> = ({ color, width = '80%', height = '80%' }) => (
  <svg id="icon-light" viewBox="0 0 39 32" width={width} height={height}>
    <title>Licht</title>
    <path
      fill={color}
      stroke={color}
      d="M23.011 22.049c-0.011-3.573 2.051-5.656 2.051-5.656 1.587-1.631 3.087-3.878 3.087-6.365s-0.982-4.745-2.569-6.376c-1.598-1.636-3.791-2.651-6.213-2.651h0.104c-2.422 0-4.62 1.015-6.207 2.645s-2.569 3.884-2.569 6.371c0 2.487 1.495 4.74 3.082 6.371 0 0 2.062 2.089 2.051 5.662"
    />
    <path fill={color} d="M15.615 24.455h7.636v1.091h-7.636v-1.091z" />
    <path fill={color} d="M15.615 27.182h7.636v1.091h-7.636v-1.091z" />
    <path fill={color} d="M17.251 29.909h4.364v1.091h-4.364v-1.091z" />
  </svg>
)

const Sensor: FC<Props> = ({ color, width = '65%', height = '65%' }) => (
  <svg id="icon-sensor" viewBox="0 0 39 32" width={width} height={height}>
    <title>Sensor</title>
    <path
      fill={color}
      d="M19.419 14.543c0.851 0 1.541 0.651 1.541 1.457 0 0.799-0.69 1.457-1.541 1.457s-1.541-0.651-1.541-1.457c0-0.799 0.69-1.457 1.541-1.457zM19.419 13.254c-1.566 0-2.83 1.225-2.83 2.746 0 1.515 1.27 2.746 2.83 2.746s2.83-1.231 2.83-2.746c0.006-1.515-1.263-2.746-2.83-2.746v0z"
    />
    <path
      fill="transparent"
      stroke={color}
      d="M24.518 10.785c1.399 1.334 2.269 3.178 2.269 5.215s-0.864 3.874-2.263 5.209"
    />
    <path
      fill="transparent"
      stroke={color}
      d="M28.482 6.95c2.45 2.314 3.964 5.518 3.964 9.050s-1.515 6.736-3.964 9.050"
    />
    <path
      fill="transparent"
      stroke={color}
      d="M32.453 3.108c3.5 3.3 5.666 7.858 5.666 12.892s-2.166 9.592-5.666 12.892"
    />
    <path
      fill="transparent"
      stroke={color}
      d="M14.32 21.209c-1.399-1.334-2.269-3.178-2.269-5.215s0.864-3.874 2.263-5.208"
    />
    <path
      fill="transparent"
      stroke={color}
      d="M10.381 25.050c-2.45-2.314-3.964-5.518-3.964-9.050s1.515-6.736 3.964-9.050"
    />
    <path
      fill="transparent"
      stroke={color}
      d="M6.391 28.892c-3.5-3.3-5.666-7.858-5.666-12.892s2.166-9.592 5.666-12.892"
    />
  </svg>
)

const Temperature: FC<Props> = ({ color, width = '80%', height = '80%' }) => (
  <svg id="icon-temp" viewBox="0 0 39 32" width={width} height={height}>
    <title>Temperatur</title>
    <path
      fill={color}
      d="M24.851 1.185c0.747 0 1.5 0.427 1.5 1.369v22.28l0.379 0.35c0.747 0.688 1.174 1.577 1.174 2.448 0 1.695-1.434 3.183-3.070 3.183-1.642 0-3.029-1.458-3.029-3.183 0-1.215 0.836-2.116 1.197-2.448l0.385-0.35v-22.28c0-1.008 0.788-1.369 1.464-1.369zM24.851 0c-1.452 0-2.649 0.99-2.649 2.555v21.758c-0.871 0.8-1.583 1.991-1.583 3.319 0 2.412 1.974 4.368 4.214 4.368s4.256-1.956 4.256-4.368c0-1.328-0.688-2.519-1.553-3.319v-21.758c0-1.565-1.227-2.555-2.685-2.555v0z"
    />
    <path stroke={color} d="M24.875 3.26v24.775" />
    <path
      fill={color}
      d="M26.783 27.762c0 1.044-0.847 1.891-1.891 1.891s-1.891-0.847-1.891-1.891c0-1.044 0.847-1.891 1.891-1.891s1.891 0.847 1.891 1.891z"
    />
    <path fill={color} d="M9.755 2.963h10.076v1.185h-10.076v-1.185z" />
    <path fill={color} d="M12.718 5.927h7.112v1.185h-7.112v-1.185z" />
    <path fill={color} d="M12.718 8.891h7.112v1.185h-7.112v-1.185z" />
    <path fill={color} d="M9.755 11.854h10.076v1.185h-10.076v-1.185z" />
    <path fill={color} d="M12.718 14.818h7.112v1.185h-7.112v-1.185z" />
    <path fill={color} d="M12.718 17.781h7.112v1.185h-7.112v-1.185z" />
    <path fill={color} d="M9.755 20.745h10.076v1.185h-10.076v-1.185z" />
  </svg>
)

const Window: FC<Props> = ({ color, width = '80%', height = '80%' }) => (
  <svg id="icon-window" viewBox="0 0 39 32" width={width} height={height}>
    <title>Fenster</title>
    <path
      fill={color}
      d="M32.755 1.333v10.667h-26.667v-10.667h26.667zM34.089 0h-29.333v13.333h29.333v-13.333z"
    />
    <path fill={color} d="M31.422 13.333v17.333h-24v-17.333h24zM32.755 12h-26.667v20h26.667v-20z" />
    <path fill={color} d="M18.755 12.667h1.333v18.667h-1.333v-18.667z" />
    <path fill={color} d="M31.422 21.333v1.333h-25.333v-1.333h25.333z" />
  </svg>
)

const Plus: FC<Props> = ({ width = '40%', height = '40%' }) => {
  const color = theme.global.colors.iconInactive

  return (
    <svg id="icon-plus" viewBox="0 0 448 512" width={width} height={height}>
      <title>Plus</title>
      <path
        fill={color}
        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
      />
    </svg>
  )
}

const Settings: FC<Props> = ({ color, width = '80%', height = '80%' }) => (
  <svg className="rotate" viewBox="0 0 512 512" height={height} width={width}>
    <title>Einstellungen</title>
    <path
      fill={color}
      d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
    />
  </svg>
)

const Reload: FC<Props> = ({ color, width = '80%', height = '80%' }) => (
  <svg className="rotate" viewBox="0 0 512 512" height={height} width={width}>
    <title>Aktualisieren</title>
    <path
      fill={color}
      d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"
    />
  </svg>
)

const CircleEmpty: FC<Props> = ({ color, width = '80%', height = '80%' }) => (
  <svg viewBox="0 0 512 512" height={height} width={width}>
    <title>Räume</title>
    <path
      fill={color}
      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"
    />
  </svg>
)

const CircleFull: FC<Props> = ({ color, width = '80%', height = '80%' }) => (
  <svg viewBox="0 0 512 512" height={height} width={width}>
    <title>Geräte</title>
    <path fill={color} d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z" />
  </svg>
)

const Signout: FC<Props> = ({ color }) => (
  <svg viewBox="0 0 512 512" height="60%" width="60%">
    <title>Abmelden</title>
    <path
      fill={color}
      d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
    />
  </svg>
)

const ArrowRight: FC<Props> = ({ color, width = '80%', height = '80%' }) => (
  <svg viewBox="0 0 448 512" height={height} width={width}>
    <title>Pfeil Rechts</title>
    <path
      fill={color}
      d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"
    />
  </svg>
)

const Battery: FC<Props> = ({ color, width = '80%', height = '80%' }) => (
  <svg viewBox="0 0 512 512" height={height} width={width}>
    <title>Batterie</title>
    <path
      fill={color}
      d="M480 128h-32V80c0-8.84-7.16-16-16-16h-96c-8.84 0-16 7.16-16 16v48H192V80c0-8.84-7.16-16-16-16H80c-8.84 0-16 7.16-16 16v48H32c-17.67 0-32 14.33-32 32v256c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32V160c0-17.67-14.33-32-32-32zM192 264c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16zm256 0c0 4.42-3.58 8-8 8h-40v40c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-40h-40c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h40v-40c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v40h40c4.42 0 8 3.58 8 8v16z"
    />
  </svg>
)
