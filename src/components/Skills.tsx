"use client";

import { useState } from "react";

/* ================= TYPES ================= */
type Skill = {
  name: string;
  level: number;
  color: string;
  icon: React.ReactNode;
};

type Category = {
  id: string;
  label: string;
  skills: Skill[];
};

/* ================= ICONS ================= */
const Icons = {
  html: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
    </svg>
  ),
  css: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
    </svg>
  ),
  js: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
    </svg>
  ),
  ts: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 011.306.34v2.458a3.95 3.95 0 00-.643-.361 5.093 5.093 0 00-.717-.26 5.768 5.768 0 00-1.527-.198c-.424 0-.8.05-1.128.148-.328.098-.585.24-.771.428-.186.187-.28.413-.28.68 0 .257.08.475.24.653.162.179.394.343.696.494.302.15.668.305 1.098.463.66.24 1.22.5 1.678.783.458.282.806.63 1.043 1.043.238.413.356.925.356 1.535 0 .72-.186 1.33-.558 1.83-.373.5-.887.876-1.543 1.13-.656.253-1.41.38-2.264.38-.639 0-1.267-.06-1.883-.18a7.845 7.845 0 01-1.699-.51v-2.553c.517.28 1.04.487 1.571.62.531.135 1.029.202 1.494.202.42 0 .796-.049 1.13-.148.334-.1.596-.244.786-.435.19-.19.286-.425.286-.703 0-.253-.081-.47-.243-.653-.162-.183-.4-.353-.713-.51-.313-.158-.699-.323-1.157-.495-.5-.183-.965-.4-1.395-.652a5.202 5.202 0 01-1.017-.898 3.469 3.469 0 01-.655-1.155 4.573 4.573 0 01-.23-1.5c0-.72.19-1.34.57-1.86.38-.521.92-.914 1.62-1.178.7-.265 1.523-.397 2.47-.397zM12.03 9.75v2.115h-2.962v9.135H6.472V11.865H3.51V9.75h8.52z" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M11.214 12.603l6.771 9.461h1.642l-6.28-8.775 6.075-8.29h-1.589l-5.532 7.541-3.9-5.45c-.4-.56-1.024-.89-1.7-.89H5.57v14.87h1.457V7.585l4.187 5.018zM23.874 12C23.874 5.374 18.5 0 11.874 0S-.126 5.374-.126 12s5.374 12 12 12c1.343 0 2.635-.223 3.84-.63L8.36 13.44 5.228 9.695v9.918h1.457v-7.32l6.28 8.008c.035.045.073.086.113.125 1.297.352 2.666.546 4.086.546 6.626 0 12-5.374 12-12z" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  ),
  node: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
    </svg>
  ),
  express: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
    </svg>
  ),
  mongo: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.12-1.093.12-1.093l.032-.142c.378-.788.55-1.626.55-2.483 0-.28-.02-.54-.055-.815.686-.114 1.352-.34 1.946-.667 2.185-1.183 3.5-3.497 3.5-6.045 0-.55-.06-1.097-.192-1.622a10.72 10.72 0 00-.099-.578zM11.8 19.4s-.126-1.153-.025-2.442c.3-.096 1.68-.594 2.604-1.66l.13 2.084c-.05 1.776-1.674 3.317-2.71 4.018z" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  vscode: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.261A1 1 0 00.326 8.74L3.899 12 .326 15.26a1 1 0 00.001 1.479L1.65 17.94a.999.999 0 001.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 001.704.29l4.942-2.377A1.5 1.5 0 0024 20.06V3.939a1.5 1.5 0 00-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
    </svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 00-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z" />
    </svg>
  ),
  postman: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M13.527.099C6.955-.744.942 3.9.063 10.471c-.823 6.475 3.6 12.395 9.988 13.557 6.465 1.176 12.567-3.057 13.742-9.522 1.177-6.465-3.015-12.604-9.457-13.85-.267-.055-.535-.09-.804-.106-.002-.002-.004-.002-.006-.001zM9.936 6.015a.521.521 0 01.354.146l3.707 3.707 3.2-3.2a.521.521 0 01.738.738l-3.2 3.2 3.707 3.707a.521.521 0 01-.354.886.518.518 0 01-.354-.148l-3.707-3.707-3.2 3.2a.521.521 0 01-.738-.738l3.2-3.2-3.707-3.707a.521.521 0 01.354-.886zM4.106 9.5h.001zM12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zm0 1a8.5 8.5 0 110 17 8.5 8.5 0 010-17z" />
    </svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  reactnative: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278z" />
    </svg>
  ),
};

/* ================= DATA ================= */
const CATEGORIES: Category[] = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "HTML5",       level: 95, color: "from-[#e34c26] to-[#f06529]", icon: Icons.html },
      { name: "CSS3",        level: 92, color: "from-[#264de4] to-[#2965f1]", icon: Icons.css },
      { name: "JavaScript",  level: 90, color: "from-[#f0db4f] to-[#e8c500]", icon: Icons.js },
      { name: "TypeScript",  level: 82, color: "from-[#007acc] to-[#3178c6]", icon: Icons.ts },
      { name: "React.js",    level: 90, color: "from-[#61dafb] to-[#21a1c4]", icon: Icons.react },
      { name: "Next.js",     level: 88, color: "from-[#000000] to-[#333333]", icon: Icons.next },
      { name: "Tailwind CSS",level: 93, color: "from-[#06b6d4] to-[#0ea5e9]", icon: Icons.tailwind },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js",     level: 87, color: "from-[#68a063] to-[#3c873a]", icon: Icons.node },
      { name: "Express.js",  level: 85, color: "from-[#7c7c7c] to-[#353535]", icon: Icons.express },
      { name: "MongoDB",     level: 84, color: "from-[#4db33d] to-[#3f9c35]", icon: Icons.mongo },
      { name: "REST APIs",   level: 88, color: "from-purple-main to-pink-500", icon: Icons.api },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    skills: [
      { name: "React Native", level: 80, color: "from-[#61dafb] to-[#21a1c4]", icon: Icons.reactnative },
      { name: "Expo",         level: 78, color: "from-[#000000] to-[#4630eb]", icon: Icons.reactnative },
    ],
  },
  {
    id: "tools",
    label: "Tools & Others",
    skills: [
      { name: "Git",          level: 88, color: "from-[#f34f29] to-[#e2431e]", icon: Icons.git },
      { name: "GitHub",       level: 90, color: "from-[#333333] to-[#000000]", icon: Icons.github },
      { name: "VS Code",      level: 95, color: "from-[#007acc] to-[#0098ff]", icon: Icons.vscode },
      { name: "Figma",        level: 75, color: "from-[#a259ff] to-[#f24e1e]", icon: Icons.figma },
      { name: "Postman",      level: 85, color: "from-[#ff6c37] to-[#ff8a5b]", icon: Icons.postman },
    ],
  },
];

const TABS = [
  { id: "all", label: "All Skills" },
  ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
];

/* ================= SKILL CARD ================= */
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <div
      style={{ animationDelay: `${index * 60}ms` }}
      className="group relative rounded-2xl p-5 overflow-hidden
        bg-white/[0.04] backdrop-blur-xl
        border border-purple-main/15 hover:border-purple-light/40
        transition-all duration-500 hover:-translate-y-1.5
        hover:shadow-[0_20px_50px_rgba(124,58,237,0.35)]
        animate-[fadeUp_0.5s_ease-out_both]"
    >
      {/* Hover glow */}
      <span className={`absolute inset-0 opacity-0 group-hover:opacity-[0.08]
        bg-gradient-to-br ${skill.color} transition-opacity duration-500`} />

      <div className="relative flex items-center gap-4">
        {/* Icon box */}
        <div className={`shrink-0 w-12 h-12 grid place-items-center rounded-xl p-2.5
          bg-gradient-to-br ${skill.color} text-white
          shadow-[0_8px_25px_rgba(124,58,237,0.35)]
          transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
          {skill.icon}
        </div>

        {/* Name + percentage */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[14.5px] font-black tracking-tight text-white truncate">
              {skill.name}
            </h4>
            <span className="text-[12px] font-black text-purple-light tabular-nums">
              {skill.level}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="relative h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
            {/* Track glow */}
            <span className={`absolute inset-0 opacity-30 bg-gradient-to-r ${skill.color} blur-md`} />

            {/* Fill */}
            <span
              className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${skill.color}
                shadow-[0_0_12px_rgba(124,58,237,0.6)]
                transition-[width] duration-1000 ease-out`}
              style={{ width: `${skill.level}%` }}
            >
              {/* Shimmer */}
              <span className="absolute inset-0 rounded-full overflow-hidden">
                <span className="absolute -inset-y-1 -left-1/3 w-1/3 bg-white/60 blur-sm
                  -translate-x-full group-hover:translate-x-[500%]
                  transition-transform duration-1000 rotate-12" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN ================= */
export default function Skills() {
  const [activeTab, setActiveTab] = useState("all");

  const visibleCategories =
    activeTab === "all"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.id === activeTab);

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full overflow-hidden py-24 px-6
        bg-gradient-to-br from-[#0f0a1e] via-[#150c28] to-[#0f0a1e]"
    >
      {/* Ambient blobs */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full
        bg-purple-main/20 blur-[140px] animate-[pulseGlow_8s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full
        bg-pink-500/15 blur-[140px] animate-[pulseGlow_10s_ease-in-out_infinite_reverse] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ===== HEADING ===== */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
            bg-white/5 backdrop-blur-md border border-purple-main/25
            shadow-[0_4px_20px_rgba(124,58,237,0.2)] mb-5">
            <span className="w-2 h-2 rounded-full bg-purple-main animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-black text-purple-100/80">
              My Skills
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight
            font-[var(--font-display)] leading-[1.05]">
            <span className="text-white">Tech Stack </span>
            <span className="bg-gradient-to-br from-purple-light via-pink-400 to-purple-main
              bg-clip-text text-transparent">
              I work with
            </span>
          </h2>

          <div className="mt-5 mx-auto flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-purple-main" />
            <span className="w-2 h-2 rounded-full bg-purple-main animate-pulse" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-purple-main" />
          </div>

          <p className="mt-6 text-[14.5px] md:text-[16px] leading-relaxed font-medium
            text-purple-100/70 max-w-2xl mx-auto">
            A complete toolkit for building modern, scalable, and high-performance
            web &amp; mobile applications — from pixel-perfect UI to solid backend.
          </p>
        </div>

        {/* ===== TABS ===== */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {TABS.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`relative px-5 py-2.5 rounded-full text-[13px] font-bold tracking-tight
                  transition-all duration-300 overflow-hidden
                  ${isActive
                    ? "text-white"
                    : "text-purple-100/70 hover:text-white"}`}
              >
                {/* Active bg */}
                {isActive && (
                  <span className="absolute inset-0 rounded-full
                    bg-gradient-to-br from-purple-main via-purple-light to-pink-500
                    shadow-[0_8px_25px_rgba(124,58,237,0.5)]" />
                )}
                {/* Inactive hover bg */}
                {!isActive && (
                  <span className="absolute inset-0 rounded-full
                    bg-white/[0.05] border border-purple-main/20
                    transition-all duration-300
                    hover:bg-white/[0.1]" />
                )}
                <span className="relative">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* ===== SKILLS GRID ===== */}
        <div className="flex flex-col gap-10">
          {visibleCategories.map((cat) => (
            <div key={cat.id}>
              {/* Category label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-main animate-pulse" />
                <h3 className="text-[15px] uppercase tracking-[0.25em] font-black
                  text-purple-light">
                  {cat.label}
                </h3>
                <span className="h-px flex-1 bg-gradient-to-r from-purple-main/40 to-transparent" />
                <span className="text-[11px] font-bold text-purple-100/40">
                  {cat.skills.length} skills
                </span>
              </div>

              {/* Skills grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.skills.map((skill, i) => (
                  <SkillCard key={`${cat.id}-${skill.name}`} skill={skill} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ===== BOTTOM STRIP ===== */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full
            bg-white/[0.04] backdrop-blur-xl
            border border-purple-main/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-[12.5px] font-bold tracking-tight text-purple-100/75">
              Always learning something new — currently exploring AI &amp; Cloud.
            </p>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}