import asyncio,json,base64,io
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--allow-file-access-from-files','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'])
        pg=await b.new_page(); pg.on('console',lambda m:print(m.text[:200]))
        await pg.goto('file:///home/claude/natconv/bake.html'); await pg.wait_for_function('window.done',timeout=200000)
        json.dump(await pg.evaluate('window.out'),open('bake.json','w')); await b.close()
asyncio.run(main())
