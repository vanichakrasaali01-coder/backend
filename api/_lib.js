const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const hasSupabase = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
const supabase = hasSupabase() ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY) : null;
function json(res, status, body) { res.status(status).json(body); }
function configure(res) {
  res.setHeader('Content-Type', 'application/json'); res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
}
function requireDb(res) { if (!supabase) { json(res, 503, { error: 'Database is not configured. Set server Supabase environment variables.' }); return false; } return true; }
function sign(payload) { return jwt.sign(payload, process.env.JWT_SECRET || 'development-only-change-me', { expiresIn: '8h' }); }
function verify(req) { try { return jwt.verify((req.headers.authorization || '').replace(/^Bearer\s+/i, ''), process.env.JWT_SECRET || 'development-only-change-me'); } catch { return null; } }
function requireAdmin(req, res) { const user = verify(req); if (!user || user.role !== 'admin') { json(res, 401, { error: 'Admin authentication required' }); return null; } return user; }
function method(res, req, allowed) { if (!allowed.includes(req.method)) { json(res, 405, { error: 'Method not allowed' }); return false; } return true; }
module.exports = { supabase, hasSupabase, json, configure, requireDb, sign, verify, requireAdmin, method, bcrypt };
