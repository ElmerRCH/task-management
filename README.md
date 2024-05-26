# task management
# Administrador de tareas
# https://aprendepythonhoy.com/proyectos-practicos-para-mejorar-tu-portafolio-en-python/



ngOnInit() {
    interval(15000).pipe(
      startWith(0),
      switchMap(() => this.monitorService.DataPrep()),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.prep = data;
    });

    //const reloadPage = () => {
    //  window.location.reload();
    //};

    // setTimeout(reloadPage, 15000);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }