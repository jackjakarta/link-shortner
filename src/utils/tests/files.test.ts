import { bufferToArrayBuffer } from '../files';

describe('bufferToArrayBuffer', () => {
  test('should convert a Buffer to an ArrayBuffer', () => {
    const buffer = Buffer.from([1, 2, 3, 4]);
    const arrayBuffer = bufferToArrayBuffer(buffer);

    expect(arrayBuffer).toBeInstanceOf(ArrayBuffer);
    const uint8Array = new Uint8Array(arrayBuffer);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect([...uint8Array]).toEqual([1, 2, 3, 4]);
  });

  test('should handle an empty Buffer', () => {
    const buffer = Buffer.from([]);
    const arrayBuffer = bufferToArrayBuffer(buffer);

    expect(arrayBuffer).toBeInstanceOf(ArrayBuffer);
    const uint8Array = new Uint8Array(arrayBuffer);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect([...uint8Array]).toEqual([]);
  });

  test('should handle large Buffers correctly', () => {
    const buffer = Buffer.from(new Array(1e6).fill(0).map((_, i) => i % 256));
    const arrayBuffer = bufferToArrayBuffer(buffer);

    expect(arrayBuffer).toBeInstanceOf(ArrayBuffer);
    const uint8Array = new Uint8Array(arrayBuffer);

    expect(uint8Array.length).toBe(buffer.length);
    expect(uint8Array[0]).toBe(buffer[0]);
    expect(uint8Array[uint8Array.length - 1]).toBe(buffer[buffer.length - 1]);
  });

  test('should not modify the original Buffer', () => {
    const buffer = Buffer.from([5, 6, 7, 8]);
    bufferToArrayBuffer(buffer);

    expect(buffer).toEqual(Buffer.from([5, 6, 7, 8]));
  });
});
