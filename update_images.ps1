$newImages = @(Get-ChildItem -Path "e:\yakin traders\assets\images\new" -File | Select-Object -ExpandProperty Name)
$newIndex = 0

$files = Get-ChildItem -Path "e:\yakin traders" -Recurse -Include *.html,*.json,*.js | Where-Object { $_.FullName -notmatch 'node_modules|\.git|new' }

$map = @{}

foreach ($f in $files) {
    if ((Test-Path -Path $f.FullName -PathType Leaf) -eq $False) { continue }
    $content = Get-Content $f.FullName -Raw
    
    # Matches URLs corresponding to old motor images. 
    $regex = '(?i)(?<=["''])(?:\.\./)*(?:assets/)?(?:images|image|img)/[^"'']*?(?:hp|motor|kirloskar|siemens|abb|weg|vem|crompton)[^"'']*?\.webp(?=["''])'
    
    $matches = [regex]::Matches($content, $regex)
    $newContent = $content
    
    foreach ($m in $matches) {
        $oldPath = $m.Value
        
        # Don't replace if it's already using the "new" folder
        if ($oldPath -match '/new/') { continue }

        if (-not $map.ContainsKey($oldPath)) {
            $newFilename = $newImages[$newIndex % $newImages.Length]
            
            # Simple replacement strategy for relativity
            if ($oldPath -match '^\.\./assets/images/') {
                $map[$oldPath] = "../assets/images/new/$newFilename"
            } elseif ($oldPath -match '^assets/images/') {
                $map[$oldPath] = "assets/images/new/$newFilename"
            } elseif ($oldPath -match '^image(?:s)?/') {
                $map[$oldPath] = "../assets/images/new/$newFilename"
            } else {
                $map[$oldPath] = "assets/images/new/$newFilename"
            }
            $newIndex++
        }
        
        $newContent = $newContent.Replace($oldPath, $map[$oldPath])
    }
    
    if ($content -ne $newContent) {
        Set-Content $f.FullName -Value $newContent -Encoding UTF8
    }
}
