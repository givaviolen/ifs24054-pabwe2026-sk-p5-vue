import { describe, it, expect, beforeEach, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import Editor from "@toast-ui/editor";
import MarkdownViewer from "./MarkdownViewer.vue";

describe("MarkdownViewer", () => {
  beforeEach(() => {
    Editor.last = undefined;
  });

  it("membuat viewer dan memperbarui isi saat prop berubah", async () => {
    const wrapper = mount(MarkdownViewer, { props: { value: "# Judul" } });
    await vi.waitFor(() => expect(Editor.last).toBeDefined());
    const viewer = Editor.last;
    expect(viewer.options.viewer).toBe(true);
    expect(viewer.options.initialValue).toBe("# Judul");
    await wrapper.setProps({ value: "baru" });
    expect(viewer.markdown).toBe("baru");
  });

  it("memakai nilai kosong secara default", async () => {
    mount(MarkdownViewer);
    await vi.waitFor(() => expect(Editor.last).toBeDefined());
    expect(Editor.last.options.initialValue).toBe("");
  });

  it("tidak membuat viewer jika di-unmount sebelum modul termuat", async () => {
    Editor.last = undefined;
    const wrapper = mount(MarkdownViewer);
    wrapper.unmount();
    await flushPromises();
    expect(Editor.last).toBeUndefined();
  });
});