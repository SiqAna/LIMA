	$global:LastCommandEnd = Get-Date
	Register-EngineEvent PowerShell.OnIdle -Action {
    	$global:LastCommandEnd = Get-Date
	} | Out-Null

	function prompt {
    	# Pegar o caminho atual
	$caminhoAtual = $ExecutionContext.SessionState.Path.CurrentLocation.Path
	$pastaPessoal = $env:USERPROFILE
    	$user = $env:USERNAME
    	$computer = $env:COMPUTERNAME
    	$identity = [System.Security.Principal.WindowsIdentity]::GetCurrent()
    	$principal = New-Object System.Security.Principal.WindowsPrincipal($identity)
    	$global:LastCommandStart = Get-Date 
    	$now = Get-Date
    	$duration = $now - $global:LastCommandStart
    	$global:LastCommandStart = $now

    if ($principal.IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)) {
        Write-Host "[ADMIN] " -ForegroundColor Red -NoNewline
    }
   
    # Verificar se o caminho atual está dentro da pasta pessoal
    if ($caminhoAtual.StartsWith($pastaPesssoal, [System.StringComparison]::OrdinalIgnoreCase)) {

        # Substituir o caminho com o símbolo "~" 
        $caminhoModificado = "~" + $caminhoAtual.Substring($pastaPessoal.Length)
	
    }

    # Texto base do prompt
    Write-Host "PS " -NoNewline

        #Escreve o nome do usuário e do computador em verde
    Write-Host $env:USERNAME@$env:COMPUTERNAME -ForegroundColor Green -NoNewline

    #Escreve o caminho da pasta em AMARELO
    Write-Host $caminhoModificado -NoNewline -ForegroundColor Yellow

    #Obter o nome do branch atual
    $gitBranch = git branch --show-current 2>$null 

    #Se for um repositório Git, acrescenta o nome do branch{}
    if ($gitBranch) {
        #Escrever o nome do branch em CIANO
        Write-Host " (" -NoNewline
        Write-Host $gitBranch -NoNewline -ForegroundColor Cyan

        #Verifica se tem mudança não comitada
    $gitChanges = git status --porcelain 2>$null
    $gitUnstaged = git diff --name-only 2>$null

    if ($gitChanges) {
        Write-Host " há mudanças a serem commitadas ❌" -ForegroundColor Red -NoNewline
    }
    elseif ($gitUnstaged){
         Write-Host " há mudanças não staged ⚡" -ForegroundColor Yellow -NoNewline
    }
    else {
        Write-Host " tudo certo!✔" -ForegroundColor Green -NoNewline
    }

        Write-Host ")" -NoNewline
    }

    if ($LASTEXITCODE -eq 0){
        Write-Host "> " -ForegroundColor Green 
    } else {
        Write-Host "> " -ForegroundColor Red 
    }

    $last = Get-History -Count 1

if ($last) {
    $duration = $last.EndExecutionTime - $last.StartExecutionTime

    if ($duration.TotalSeconds -lt 1) {
        $ms = [math]::Round($duration.TotalMilliseconds)
        Write-Host "[$ms ms] " -ForegroundColor Magenta -NoNewline
    }
    else {
        $s = $duration.TotalSeconds.ToString("0.0")
        Write-Host "[$s s] " -ForegroundColor Magenta -NoNewline
    }
    }
    return "> "
}