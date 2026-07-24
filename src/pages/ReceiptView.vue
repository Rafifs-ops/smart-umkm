<template>
  <div class="flex flex-col gap-4">
    
    <!-- Top Success Banner -->
    <div class="p-5 text-center bg-gradient-to-br from-[#0c2e26] via-[#12382f] to-[#0a2721] border border-[#10b981]/40 rounded-3xl shadow-xl relative overflow-hidden">
      <div class="inline-flex items-center justify-center w-14 h-14 bg-[#10b981]/20 border border-[#34d399]/40 rounded-full mb-2 text-[#34d399]">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 class="text-xl font-extrabold text-[#e6f7f5]">Transaksi Berhasil!</h2>
      <p class="text-xs text-[#a7f3d0] mt-1">Penjualan telah otomatis tersimpan ke database & laporan.</p>
    </div>

    <!-- E-Receipt Ticket Card -->
    <div class="bg-[#122c30] border border-[#14b8a6]/40 rounded-3xl shadow-xl overflow-hidden relative">
      
      <!-- Receipt Header -->
      <div class="px-5 py-3.5 bg-[#0a2024] border-b border-[#14b8a6]/30 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#2dd4bf]"></span>
          <h3 class="text-xs font-bold text-[#e6f7f5] uppercase tracking-wider">Ringkasan Nota Struk</h3>
        </div>
        <span class="text-[11px] font-mono text-[#87c2ba]">{{ transaksi?.tanggal }}</span>
      </div>

      <!-- Receipt Content Body -->
      <div class="p-5">
        <div class="space-y-3 mb-4">
          <div 
            v-for="(item, index) in transaksi?.items" 
            :key="index"
            class="flex justify-between items-start text-xs p-2.5 rounded-xl bg-[#0a2024]/60 border border-[#14b8a6]/15"
          >
            <div>
              <p class="font-bold text-[#e6f7f5] text-sm">{{ item.nama }}</p>
              <p class="text-[#87c2ba] text-[11px] mt-0.5">
                {{ Number(item.scanQty || item.quantity || 1) }} x Rp {{ Number(item.harga).toLocaleString('id-ID') }}
              </p>
            </div>
            <p class="font-bold text-[#67e8f9] text-sm">
              Rp {{ (Number(item.harga) * Number(item.scanQty || item.quantity || 1)).toLocaleString('id-ID') }}
            </p>
          </div>
        </div>

        <!-- Receipt Total Divider -->
        <div class="pt-3 border-t-2 border-dashed border-[#14b8a6]/30 flex justify-between items-center">
          <p class="text-xs font-bold text-[#87c2ba] uppercase tracking-wider">Total Penjualan</p>
          <p class="text-lg font-extrabold text-[#2dd4bf]">
            Rp {{ (transaksi?.totalPenjualan || 0).toLocaleString('id-ID') }}
          </p>
        </div>

        <!-- QR Code Container -->
        <div v-if="qrCodeBase64" class="mt-4 pt-3 border-t border-[#14b8a6]/20 text-center">
          <p class="text-[11px] text-[#87c2ba] mb-2 font-medium">QR Code Verifikasi Struk Digital</p>
          <div class="inline-block p-3 bg-[#0a2024] rounded-2xl border border-[#14b8a6]/30 shadow-inner">
            <img 
              :src="qrCodeBase64" 
              alt="QR Code Nota"
              :style="{ width: qrDisplaySize + 'px', height: qrDisplaySize + 'px', maxWidth: '100%' }"
              class="object-contain mx-auto rounded-lg"
            />
          </div>
        </div>
      </div>

    </div>

    <!-- Action Buttons -->
    <div class="space-y-2.5 mt-1">
      <button 
        @click="unduhPDF"
        class="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-[#e6f7f5] bg-gradient-to-r from-[#e11d48] to-[#f43f5e] border border-[#fb7185]/40 rounded-2xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Unduh Nota Struk (PDF)
      </button>

      <RouterLink 
        to="/scan"
        class="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-extrabold text-[#091b1e] bg-gradient-to-r from-[#2dd4bf] via-[#14b8a6] to-[#10b981] border border-[#2dd4bf]/40 rounded-2xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
      >
        Lanjut Transaksi Baru
      </RouterLink>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db } from '../database/db';
import { generateAndDownloadReceiptPDF } from '../utils/pdfHandler';
import QRCode from 'qrcode';
import { useToast } from '../composables/useToast';

const route = useRoute();
const router = useRouter();
const { showToast } = useToast();
const transaksi = ref(null);
const qrCodeBase64 = ref(null);

const qrDisplaySize = computed(() => {
  const baseSize = 140;
  const itemCount = transaksi.value?.items?.length || 0;
  return Math.min(baseSize + (itemCount * 10), 220);
});

onMounted(async () => {
  const id = Number(route.query.id);
  if (id) {
    transaksi.value = await db.penjualan.get(id);
    if (transaksi.value) {
      const token = transaksi.value.tokenNota || `TRX-${id}`;
      const urlTujuan = `https://rafifs-ops.github.io/note-viewer-smartpos/?t=${token}`;
      qrCodeBase64.value = await QRCode.toDataURL(urlTujuan, { margin: 4, width: 400, errorCorrectionLevel: 'L', scale: 4 });
    }
  }
  if (!transaksi.value) {
    showToast("Data transaksi tidak ditemukan!", "error");
    router.replace('/');
  }
});

const unduhPDF = async () => {
  if (!transaksi.value) return;
  await generateAndDownloadReceiptPDF(transaksi.value, qrCodeBase64.value);
};
</script>
