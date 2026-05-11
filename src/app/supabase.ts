import { Injectable, signal } from '@angular/core';
import { createClient, RealtimeChannel } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root',
})

export class Supabase {
supabaseUrl = 'https://sgeldqqjbsxugotjiilw.supabase.co'
supabaseKey = 'sb_publishable_pZRR_Cwb2pLRUrzCVmZH7Q_Rw7Fl7Db'
supabase = createClient(this.supabaseUrl, this.supabaseKey)

products = signal<{ name:string, count:number}[]>([])

channels: RealtimeChannel | undefined

async getProducts() {
let { data: products, error } = await this.supabase
  .from('products')
  .select('name, count')
  .range(0, 9)
  .lte('count', 300)

  if(!products) {
    console.error(error);
    return;
  }
  this.products.set(products);


this.channels = this.supabase.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'products' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()
}

ngOnDestroy(){
  if(this.channels)
  this.supabase.removeChannel(this.channels);
  
}

async setProduct(product: { name:string, count:number}) {
  const { data, error } = await this.supabase
  .from('products')
  .insert([product])
  .select()
}

async updateProduct(id: number){
  const { data, error } = await this.supabase
  .from('products')
  .update({ name: 'in-ear-buds' })
  .eq('id', id)
  .select()    
}

async deleteProduct(id: number){
  const { data, error } = await this.supabase
  .from('products')
  .delete()
  .eq('id', id)
  .select()    
}
}
