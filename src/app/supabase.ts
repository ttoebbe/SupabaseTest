import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root',
})

export class Supabase {
supabaseUrl = 'https://sgeldqqjbsxugotjiilw.supabase.co'
supabaseKey = 'sb_publishable_pZRR_Cwb2pLRUrzCVmZH7Q_Rw7Fl7Db'
supabase = createClient(this.supabaseUrl, this.supabaseKey)

products = signal<{id:number, created_at:string, name:string, count:number}[]>([]);

async getProducts() {
let { data: products, error } = await this.supabase
  .from('products')
  .select('*')

  if(!products) {
    console.error(error);
    return;
  }
  this.products.set(products);
}
        
}
