import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js'

@Injectable({
  providedIn: 'root',
})

export class Supabase {
supabaseUrl = 'https://sgeldqqjbsxugotjiilw.supabase.co'
supabaseKey = 'sb_publishable_pZRR_Cwb2pLRUrzCVmZH7Q_Rw7Fl7Db'
supabase = createClient(this.supabaseUrl, this.supabaseKey)

products = signal<{ name:string, count:number}[]>([]);

async getProducts() {
let { data: products, error } = await this.supabase
  .from('products')
  .select('name, count')
  .range(0, 9)
  .lte('count', 50)

  if(!products) {
    console.error(error);
    return;
  }
  this.products.set(products);
}
        
}
