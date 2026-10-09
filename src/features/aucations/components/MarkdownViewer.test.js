import { describe, it, expect } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import Editor from "@toast-ui/editor";
import MarkdownViewer from "./MarkdownViewer.vue";

describe("MarkdownViewer", () => {
  it("membuat viewer dan memperbarui isi saat prop berubah", async () => {
    const wrapper = mount(MarkdownViewer, { props: { value: "# Judul" } });
    await flushPromises();
    const viewer = Editor.last;
    expect(viewer.options.viewer).toBe(true);
    expect(viewer.options.initialValue).toBe("# Judul");
    await wrapper.setProps({ value: "baru" });
    expect(viewer.markdown).toBe("baru");
  });

  it("memakai nilai kosong secara default", async () => {
    mount(MarkdownViewer);
    await flushPromises();
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