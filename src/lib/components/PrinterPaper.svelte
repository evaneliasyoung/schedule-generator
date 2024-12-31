<script lang="ts" context="module">
</script>

<script lang="ts">
</script>

<div id="print"><slot /></div>

<style lang="postcss" global>
  #print {
    width: 8.5in;
    height: 11in;
    overflow: hidden;
    background-color: white;
    color: black;
  }

  @page {
    size: letter portrait;
    margin: 0;
  }

  @media print {
    #print {
      width: 8.5in;
      height: 11in;
      overflow: hidden;
      background-color: white;
      color: black;
    }
  }
</style>
