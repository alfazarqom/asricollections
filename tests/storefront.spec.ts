import { expect, test } from '@playwright/test';

test('renders the storefront and filters products by search', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Asri Collection/);
  await expect(page.getByRole('heading', { name: /Feel good\./ })).toBeVisible();
  await expect(page.locator('.product-card')).toHaveCount(8);
  await page.screenshot({ path: 'test-results/storefront-desktop.png', fullPage: true });

  await page.getByPlaceholder('Cari produk...').fill('Luna Knit');
  await expect(page.locator('.product-card')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Luna Knit Cardigan' })).toBeVisible();
});

test('completes a clearly labelled demo checkout and shows local order history', async ({ page }) => {
  await page.goto('/');
  await page.locator('.product-card .add-button').first().click();

  await expect(page.getByRole('heading', { name: /Keranjang/ })).toBeVisible();
  await page.getByRole('button', { name: 'Lanjut checkout' }).click();

  await page.getByLabel('Nama lengkap').fill('Pelanggan Demo');
  await page.getByLabel('Nomor WhatsApp').fill('081234567890');
  await page.getByLabel('Alamat lengkap').fill('Jalan Contoh Nomor 1');
  await page.getByLabel('Kota / kabupaten').fill('Makassar');
  await page.getByRole('button', { name: 'Buat pesanan demo' }).click();

  await expect(page.getByRole('heading', { name: /Riwayat/ })).toBeVisible();
  await expect(page.getByText('Simulasi demo')).toBeVisible();
  await expect(page.getByText('Demo (tidak ada pembayaran nyata)')).toBeVisible();
  await expect(page.getByText(/Pesanan demo berhasil dibuat/)).toBeVisible();
});

test('blocks Duitku mode without a trusted server invoice endpoint', async ({ page }) => {
  await page.goto('/');
  await page.locator('.product-card .add-button').first().click();
  await page.getByRole('button', { name: 'Lanjut checkout' }).click();

  await page.getByLabel('Nama lengkap').fill('Pelanggan Sandbox');
  await page.getByLabel('Nomor WhatsApp').fill('081234567890');
  await page.getByLabel('Alamat lengkap').fill('Jalan Contoh Nomor 1');
  await page.getByLabel('Kota / kabupaten').fill('Makassar');
  await page.locator('input[name="payment"]').nth(1).check();
  await page.getByRole('button', { name: 'Periksa kesiapan Duitku' }).click();

  await expect(page.getByRole('status')).toContainText('belum dapat membuat invoice dari frontend saja');
  await expect(page.getByRole('status')).toContainText('Pesanan belum dibuat');
  await expect(page.getByRole('heading', { name: /Checkout/ })).toBeVisible();
});

test('keeps navigation and product grid usable at a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('button', { name: 'Buka menu' })).toBeVisible();
  await page.getByRole('button', { name: 'Buka menu' }).click();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Shop all' })).toBeVisible();
  await expect(page.locator('.product-grid')).toBeVisible();
  await expect(page.locator('.product-card')).toHaveCount(8);
  await page.screenshot({ path: 'test-results/storefront-mobile.png', fullPage: true });
});