import { promises as fs } from 'fs'
import path from 'path'

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

export type OrderStatus = 'En attente' | 'Confirmée' | 'En préparation' | 'Expédiée' | 'Livrée'

export interface OrderRecord {
  id: string
  email?: string
  items: OrderItem[]
  total: number
  date: string
  status: OrderStatus
  trackingNumber?: string
}

const dataDir = path.join(process.cwd(), 'data')
const ordersFile = path.join(dataDir, 'orders.json')

async function ensureStorage(): Promise<void> {
  try {
    await fs.mkdir(dataDir, { recursive: true })
  } catch {}
  try {
    await fs.access(ordersFile)
  } catch {
    await fs.writeFile(ordersFile, JSON.stringify([]), 'utf-8')
  }
}

export async function readAllOrders(): Promise<OrderRecord[]> {
  await ensureStorage()
  const content = await fs.readFile(ordersFile, 'utf-8')
  try {
    const parsed = JSON.parse(content)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function writeAllOrders(orders: OrderRecord[]): Promise<void> {
  await ensureStorage()
  await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), 'utf-8')
}

export async function getOrderById(id: string): Promise<OrderRecord | undefined> {
  const all = await readAllOrders()
  return all.find(o => o.id === id)
}

export async function createOrder(order: Omit<OrderRecord, 'trackingNumber'> & { trackingNumber?: string }): Promise<OrderRecord> {
  const all = await readAllOrders()
  const trackingNumber = order.trackingNumber ?? `TRK-${order.id}`
  const record: OrderRecord = { ...order, trackingNumber }
  all.push(record)
  await writeAllOrders(all)
  return record
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<OrderRecord | undefined> {
  const all = await readAllOrders()
  const idx = all.findIndex(o => o.id === id)
  if (idx === -1) return undefined
  all[idx] = { ...all[idx], status }
  await writeAllOrders(all)
  return all[idx]
}


