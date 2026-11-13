import { RealtimeClient } from '@supabase/realtime-js';
import { Net, makeCode, supabaseTransport } from './multinet.js';
window.__MP = { Net, makeCode, transport: (url, key) => supabaseTransport(RealtimeClient, url, key) };
