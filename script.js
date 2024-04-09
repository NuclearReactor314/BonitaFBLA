function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');

    const mainContent = document.querySelector('main');
    mainContent.classList.toggle('collapsed-main');
            
    const additionalText = document.querySelector('.additional-text');
    additionalText.classList.toggle('collapsed');

    const header = document.querySelector('header');
    header.classList.toggle('collapsed');
            
    adjustMargins(); // 调整边距
}
        
function adjustMargins() {
    const sidebar = document.getElementById('sidebar');
    const additionalText = document.querySelector('.additional-text');
    const header = document.querySelector('header');
    const mainContent = document.querySelector('main');
    const footer = document.querySelector('footer');
            
    if (sidebar.classList.contains('collapsed')) {
        additionalText.style.marginLeft = '70px';
        header.style.marginLeft = '50px';
        mainContent.style.marginLeft = '50px';
        footer.style.marginLeft = '50px';
    } else {
        additionalText.style.marginLeft = '200px';
        header.style.marginLeft = '200px';
        mainContent.style.marginLeft = '200px';
        footer.style.marginLeft = '200px';
    }
}
        
// 初始化调整边距
adjustMargins();
