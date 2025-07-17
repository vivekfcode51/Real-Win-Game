import { io } from "socket.io-client";

const domain = "https://jupitergames.vip/";
export const socket = io(domain);
